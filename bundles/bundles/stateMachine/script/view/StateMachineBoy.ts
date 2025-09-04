import { _decorator , Node, sp} from "cc";
import EventComponent from "db://quick/components/EventComponent";
import StateMachine, { BuildTransition, ITransitionDir } from "db://quick/core/stateMachine/StateMachine";

const { ccclass, property } = _decorator;

enum State {
    Walk = "walk",
    Run = "run",
    Jump = "jump",
    Idle = "idle",
}

abstract class IState {
    protected spine: sp.Skeleton = null!;
    constructor(sp: sp.Skeleton) {
        this.spine = sp;
    }

    abstract excute(from: State, to: State): boolean;
}

class WalkState extends IState {
    excute(from: State, to: State): boolean {
        if (from == State.Jump) {
            return false;
        }
        this.spine.setAnimation(0, State.Walk, true);
        return true;
    }
}

class RunState extends IState {
    excute(from: State, to: State): boolean {
        if (from == State.Jump) {
            return false;
        }
        this.spine.setAnimation(0, State.Run, true);
        return true;
    }

}

class JumpState extends IState {
    excute(from: State, to: State): boolean {
        let oldAni = this.spine.animation;
        this.spine.setAnimation(0, State.Jump, false);
        if ( oldAni ){
            if ( from == State.Idle ) {
                this.spine.addAnimation(0, State.Idle, true);
            }else{
                this.spine.addAnimation(0, oldAni == State.Run ? State.Run : State.Walk, true, 0);
            }
        }else{
            this.spine.addAnimation(0, State.Idle, true);
        }
        return true;
    }

}

class IdleState extends IState {
    excute(from: State, to: State): boolean {
        // this.spine.clearTrack(0);
        if (from == State.Jump) {
            //如果在跳的过程中，不让进入休闲，等人掉下来
            return false;
        }
        this.spine.setAnimation(0, State.Idle, true);
        return true;
    }

}

type TransitionType = (ITransitionDir<State>[] | ITransitionDir<State>);
interface Transitions {
    step: TransitionType[],
    reset: TransitionType,
    goto: TransitionType,
    changeState: TransitionType,
}

/**
 * @description 只是用于演示状态机，并不是合适的例子
 */
@ccclass("StateMachineBoy")
export default class StateMachineBoy extends EventComponent {
    static State = State;

    private boy: sp.Skeleton = null!;

    private readonly mixTime = 0.2;

    readonly shoot = "shoot";

    private fs: StateMachine<Transitions, State> = null!

    /**
     * @description 状态表
     */
    private stateMap: Map<string, IState> = new Map();

    private log(index: number, name: string, tag: string) {
        // Log.d(`[track ${index}] [animation ${name}] ${tag}`)
    }

    onLoad() {
        super.onLoad();
        this.boy = this.getComponent(sp.Skeleton)!;
        this.setMix(State.Walk, State.Run);
        this.setMix(State.Run, State.Jump);
        this.setMix(State.Walk, State.Jump);
        this.setMix(State.Run, State.Idle);
        this.setMix(State.Walk, State.Idle);
        this.setMix(State.Jump,State.Idle);
        this.boy.setStartListener((ev: sp.spine.TrackEntry) => {
            let aniName = ev.animation ? ev.animation.name : "";
            this.log(ev.trackIndex, aniName, "start");
        });
        this.boy.setInterruptListener((ev: sp.spine.TrackEntry) => {
            let aniName = ev.animation ? ev.animation.name : "";
            this.log(ev.trackIndex, aniName, "interrupt");
        });
        this.boy.setEndListener((ev: sp.spine.TrackEntry) => {
            let aniName = ev.animation ? ev.animation.name : "";
            this.log(ev.trackIndex, aniName, "end");
        });
        this.boy.setDisposeListener((ev: sp.spine.TrackEntry) => {
            let aniName = ev.animation ? ev.animation.name : "";
            this.log(ev.trackIndex, aniName, "will be disposed");
        });
        this.boy.setCompleteListener((ev: sp.spine.TrackEntry) => {
            let aniName = ev.animation ? ev.animation.name : "";
            this.log(ev.trackIndex, aniName, "complete");
            if (aniName == this.shoot) {
                this.boy.clearTrack(1);
            } else if (aniName == State.Jump) {
                let next = ev.next.animation.name;
                Log.d("下一动画", next);
                if (next) {
                    //改变当前角色状态
                    this.fs.transition.changeState(next as State);
                }
            }
        });
        this.boy.setEventListener((ev: sp.spine.TrackEntry) => {
            let aniName = ev.animation ? ev.animation.name : "";
            this.log(ev.trackIndex, aniName, "event");
        });

        let onStepTransition = (from: State, to: State) => {
            Log.d("[Step]", from, to)
            let data = this.stateMap.get(to);
            if (data) {
                return data.excute(from, to);
            }
            return false;
        }
        let onRestTransition = (from: State, to: State) => {
            Log.d("[Rest]", from, to)
            let data = this.stateMap.get(to);
            if (data) {
                return data.excute(from, to);
            }
            return false;
        }
        let onGotoTransition = (from: State, to: State) => {
            Log.d("[Goto]", from, to)
            let data = this.stateMap.get(to);
            if (data) {
                return data.excute(from, to);
            }
            return false;
        }

        let fs = new StateMachine({
            init: State.Idle,
            transitions: {
                step: [
                    BuildTransition<State>(State.Idle, State.Walk, onStepTransition),
                    BuildTransition<State>(State.Walk, State.Run, onStepTransition),
                    BuildTransition<State>(State.Run, State.Idle, onStepTransition),
                ],
                reset: BuildTransition<State>("*", State.Idle, onRestTransition),
                goto: BuildTransition<State>("*", state => state, onGotoTransition),
                changeState: BuildTransition<State>("*", state => state, (from, to) => {
                    Log.d(`[ChangeState]`, from, to);
                    return true;
                })
            }
        });
        this.fs = fs;
        this.fs.onError = (code, reason) => {
            Log.d(reason);
        }

        this.stateMap.set(State.Walk, new WalkState(this.boy));
        this.stateMap.set(State.Run, new RunState(this.boy));
        this.stateMap.set(State.Jump, new JumpState(this.boy));
        this.stateMap.set(State.Idle, new IdleState(this.boy));
        Log.d("当前状态", this.fs.state);
    }

    private setMix(ani1: string, ani2: string) {
        this.boy.setMix(ani1, ani2, this.mixTime);
        this.boy.setMix(ani2, ani1, this.mixTime);
    }

    onShoot() {
        this.boy.setAnimation(1, this.shoot, false);
    }

    onDebugSlots() {
        this.boy.debugSlots = !this.boy.debugSlots;
    }

    onDebugBones() {
        this.boy.debugBones = !this.boy.debugBones;
    }

    onTimeScale() {
        if (this.boy.timeScale == 1.0) {
            this.boy.timeScale = 0.3;
        } else {
            this.boy.timeScale = 1;
        }
    }

    onChangeState(state: State) {
        if (this.fs.state == state) {
            Log.d(`当前已经处于:${state}`)
            return;
        }
        this.fs.transition.goto(state);
    }

    onStep() {
        this.fs.transition.step();
    }
}
