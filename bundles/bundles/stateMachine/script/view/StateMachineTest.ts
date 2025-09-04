import StateMachine, { BuildTransition } from "db://quick/core/stateMachine/StateMachine"

enum EQiuActionStatus {
    None = 'None',
    PreAction = 'PreAction',
    MyTurn = 'MyTurn',
    Standup = 'Standup',
};

export function doStateMachine() {

    let onStepTransition = <State>(from:State,to:State)=>{
        Log.d("[Step]",from, to)
        return true;
    }
    let onRestTransition = <State>(from:State,to:State)=>{
        Log.d("[Rest]",from, to)
        return true;
    }
    let onGotoTransition = <State>(from:State,to:State)=>{
        Log.d("[Goto]",from, to)
        return true;
    }
    const option = {
        init: EQiuActionStatus.None,
        transitions: {
            step: [
                BuildTransition(EQiuActionStatus.None, EQiuActionStatus.PreAction,onStepTransition),
                BuildTransition(EQiuActionStatus.PreAction, EQiuActionStatus.MyTurn,onStepTransition),
                BuildTransition(EQiuActionStatus.MyTurn, EQiuActionStatus.Standup,onStepTransition),
                BuildTransition(EQiuActionStatus.Standup, EQiuActionStatus.None,onStepTransition),
            ],
            reset: BuildTransition('*', EQiuActionStatus.None, onRestTransition),
            goto: BuildTransition<EQiuActionStatus>('*', state => state, onGotoTransition)
        }
    };

    const fsm = new StateMachine(option);
    fsm.transition.step();
    fsm.transition.step();
    fsm.transition.step();
    fsm.transition.step();
    fsm.transition.reset();
    fsm.transition.goto(EQiuActionStatus.MyTurn);
    fsm.transition.goto(EQiuActionStatus.Standup);
    fsm.transition.goto(EQiuActionStatus.PreAction);
    fsm.transition.step();
    fsm.transition.step();
    fsm.transition.step();
}