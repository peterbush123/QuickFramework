// import * as $protobuf from "protobufjs";
/** Namespace GameSvr. */
declare namespace GameSvr {

    /** Properties of a CMD_GR_LogonUserID. */
    interface ICMD_GR_LogonUserID {

        /** < 游戏标识 */
        userid: number;

        /** < 登录密码 */
        password: string;

        /** < 类型索引 */
        kindid: number;

        /** < 房间密码 */
        roomPassword?: (string | null);

        /** < 机器序列 */
        machineid?: (string | null);

        /** < 广场版本 */
        PlazaVersion?: (number | null);

        /** < 框架版本 */
        FrameVersion?: (number | null);

        /** < 进程版本 */
        ProcessVersion?: (number | null);
    }

    /** Represents a CMD_GR_LogonUserID. */
    class CMD_GR_LogonUserID implements ICMD_GR_LogonUserID {

        /**
         * Constructs a new CMD_GR_LogonUserID.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_LogonUserID);

        /** < 游戏标识 */
        public userid: number;

        /** < 登录密码 */
        public password: string;

        /** < 类型索引 */
        public kindid: number;

        /** < 房间密码 */
        public roomPassword?: (string | null);

        /** < 机器序列 */
        public machineid?: (string | null);

        /** < 广场版本 */
        public PlazaVersion?: (number | null);

        /** < 框架版本 */
        public FrameVersion?: (number | null);

        /** < 进程版本 */
        public ProcessVersion?: (number | null);

        /** CMD_GR_LogonUserID _roomPassword. */
        public _roomPassword?: "roomPassword";

        /** CMD_GR_LogonUserID _machineid. */
        public _machineid?: "machineid";

        /** CMD_GR_LogonUserID _PlazaVersion. */
        public _PlazaVersion?: "PlazaVersion";

        /** CMD_GR_LogonUserID _FrameVersion. */
        public _FrameVersion?: "FrameVersion";

        /** CMD_GR_LogonUserID _ProcessVersion. */
        public _ProcessVersion?: "ProcessVersion";

        /**
         * Creates a new CMD_GR_LogonUserID instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_LogonUserID instance
         */
        public static create(properties?: GameSvr.ICMD_GR_LogonUserID): GameSvr.CMD_GR_LogonUserID;

        /**
         * Encodes the specified CMD_GR_LogonUserID message. Does not implicitly {@link GameSvr.CMD_GR_LogonUserID.verify|verify} messages.
         * @param message CMD_GR_LogonUserID message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_LogonUserID, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_LogonUserID message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_LogonUserID.verify|verify} messages.
         * @param message CMD_GR_LogonUserID message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_LogonUserID, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_LogonUserID message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_LogonUserID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_LogonUserID;

        /**
         * Decodes a CMD_GR_LogonUserID message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_LogonUserID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_LogonUserID;

        /**
         * Verifies a CMD_GR_LogonUserID message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_LogonUserID message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_LogonUserID
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_LogonUserID;

        /**
         * Creates a plain object from a CMD_GR_LogonUserID message. Also converts values to other types if specified.
         * @param message CMD_GR_LogonUserID
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_LogonUserID, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_LogonUserID to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GR_LogonMobile. */
    interface ICMD_GR_LogonMobile {

        /** < 游戏标识 */
        gameid: number;

        /** < 进程版本 */
        processversion: number;

        /** < 设备类型 */
        devicetype: number;

        /** < 行为标识 */
        behaviorflags: number;

        /** < 分页桌数 */
        pagetablecount: number;

        /** < 用户 I D */
        userid: number;

        /** < 登录密码 */
        password: string;

        /** < 机器标识 */
        machineid?: (string | null);
    }

    /** Represents a CMD_GR_LogonMobile. */
    class CMD_GR_LogonMobile implements ICMD_GR_LogonMobile {

        /**
         * Constructs a new CMD_GR_LogonMobile.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_LogonMobile);

        /** < 游戏标识 */
        public gameid: number;

        /** < 进程版本 */
        public processversion: number;

        /** < 设备类型 */
        public devicetype: number;

        /** < 行为标识 */
        public behaviorflags: number;

        /** < 分页桌数 */
        public pagetablecount: number;

        /** < 用户 I D */
        public userid: number;

        /** < 登录密码 */
        public password: string;

        /** < 机器标识 */
        public machineid?: (string | null);

        /** CMD_GR_LogonMobile _machineid. */
        public _machineid?: "machineid";

        /**
         * Creates a new CMD_GR_LogonMobile instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_LogonMobile instance
         */
        public static create(properties?: GameSvr.ICMD_GR_LogonMobile): GameSvr.CMD_GR_LogonMobile;

        /**
         * Encodes the specified CMD_GR_LogonMobile message. Does not implicitly {@link GameSvr.CMD_GR_LogonMobile.verify|verify} messages.
         * @param message CMD_GR_LogonMobile message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_LogonMobile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_LogonMobile message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_LogonMobile.verify|verify} messages.
         * @param message CMD_GR_LogonMobile message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_LogonMobile, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_LogonMobile message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_LogonMobile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_LogonMobile;

        /**
         * Decodes a CMD_GR_LogonMobile message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_LogonMobile
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_LogonMobile;

        /**
         * Verifies a CMD_GR_LogonMobile message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_LogonMobile message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_LogonMobile
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_LogonMobile;

        /**
         * Creates a plain object from a CMD_GR_LogonMobile message. Also converts values to other types if specified.
         * @param message CMD_GR_LogonMobile
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_LogonMobile, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_LogonMobile to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GR_LogonAccounts. */
    interface ICMD_GR_LogonAccounts {

        /** < 登录帐号 */
        accounts: string;

        /** < 登录密码 */
        password: string;

        /** < 机器序列 */
        machineid?: (string | null);

        /** < 广场版本 */
        plazaversion?: (number | null);

        /** < 框架版本 */
        frameversion?: (number | null);

        /** < 进程版本 */
        processversion?: (number | null);
    }

    /** Represents a CMD_GR_LogonAccounts. */
    class CMD_GR_LogonAccounts implements ICMD_GR_LogonAccounts {

        /**
         * Constructs a new CMD_GR_LogonAccounts.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_LogonAccounts);

        /** < 登录帐号 */
        public accounts: string;

        /** < 登录密码 */
        public password: string;

        /** < 机器序列 */
        public machineid?: (string | null);

        /** < 广场版本 */
        public plazaversion?: (number | null);

        /** < 框架版本 */
        public frameversion?: (number | null);

        /** < 进程版本 */
        public processversion?: (number | null);

        /** CMD_GR_LogonAccounts _machineid. */
        public _machineid?: "machineid";

        /** CMD_GR_LogonAccounts _plazaversion. */
        public _plazaversion?: "plazaversion";

        /** CMD_GR_LogonAccounts _frameversion. */
        public _frameversion?: "frameversion";

        /** CMD_GR_LogonAccounts _processversion. */
        public _processversion?: "processversion";

        /**
         * Creates a new CMD_GR_LogonAccounts instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_LogonAccounts instance
         */
        public static create(properties?: GameSvr.ICMD_GR_LogonAccounts): GameSvr.CMD_GR_LogonAccounts;

        /**
         * Encodes the specified CMD_GR_LogonAccounts message. Does not implicitly {@link GameSvr.CMD_GR_LogonAccounts.verify|verify} messages.
         * @param message CMD_GR_LogonAccounts message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_LogonAccounts, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_LogonAccounts message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_LogonAccounts.verify|verify} messages.
         * @param message CMD_GR_LogonAccounts message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_LogonAccounts, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_LogonAccounts message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_LogonAccounts
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_LogonAccounts;

        /**
         * Decodes a CMD_GR_LogonAccounts message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_LogonAccounts
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_LogonAccounts;

        /**
         * Verifies a CMD_GR_LogonAccounts message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_LogonAccounts message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_LogonAccounts
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_LogonAccounts;

        /**
         * Creates a plain object from a CMD_GR_LogonAccounts message. Also converts values to other types if specified.
         * @param message CMD_GR_LogonAccounts
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_LogonAccounts, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_LogonAccounts to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GR_LogonSuccess. */
    interface ICMD_GR_LogonSuccess {

        /** < 用户权限 */
        userright: number;

        /** < 管理权限 */
        masterright: number;
    }

    /** Represents a CMD_GR_LogonSuccess. */
    class CMD_GR_LogonSuccess implements ICMD_GR_LogonSuccess {

        /**
         * Constructs a new CMD_GR_LogonSuccess.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_LogonSuccess);

        /** < 用户权限 */
        public userright: number;

        /** < 管理权限 */
        public masterright: number;

        /**
         * Creates a new CMD_GR_LogonSuccess instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_LogonSuccess instance
         */
        public static create(properties?: GameSvr.ICMD_GR_LogonSuccess): GameSvr.CMD_GR_LogonSuccess;

        /**
         * Encodes the specified CMD_GR_LogonSuccess message. Does not implicitly {@link GameSvr.CMD_GR_LogonSuccess.verify|verify} messages.
         * @param message CMD_GR_LogonSuccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_LogonSuccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_LogonSuccess message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_LogonSuccess.verify|verify} messages.
         * @param message CMD_GR_LogonSuccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_LogonSuccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_LogonSuccess message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_LogonSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_LogonSuccess;

        /**
         * Decodes a CMD_GR_LogonSuccess message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_LogonSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_LogonSuccess;

        /**
         * Verifies a CMD_GR_LogonSuccess message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_LogonSuccess message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_LogonSuccess
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_LogonSuccess;

        /**
         * Creates a plain object from a CMD_GR_LogonSuccess message. Also converts values to other types if specified.
         * @param message CMD_GR_LogonSuccess
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_LogonSuccess, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_LogonSuccess to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GR_ConfigServer. */
    interface ICMD_GR_ConfigServer {

        /** < 桌子数目 */
        tablecount: number;

        /** < 椅子数目 */
        chaircount: number;

        /** < 房间类型 */
        servertype: number;

        /** < 房间规则 */
        serverrule: number;
    }

    /** Represents a CMD_GR_ConfigServer. */
    class CMD_GR_ConfigServer implements ICMD_GR_ConfigServer {

        /**
         * Constructs a new CMD_GR_ConfigServer.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_ConfigServer);

        /** < 桌子数目 */
        public tablecount: number;

        /** < 椅子数目 */
        public chaircount: number;

        /** < 房间类型 */
        public servertype: number;

        /** < 房间规则 */
        public serverrule: number;

        /**
         * Creates a new CMD_GR_ConfigServer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_ConfigServer instance
         */
        public static create(properties?: GameSvr.ICMD_GR_ConfigServer): GameSvr.CMD_GR_ConfigServer;

        /**
         * Encodes the specified CMD_GR_ConfigServer message. Does not implicitly {@link GameSvr.CMD_GR_ConfigServer.verify|verify} messages.
         * @param message CMD_GR_ConfigServer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_ConfigServer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_ConfigServer message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_ConfigServer.verify|verify} messages.
         * @param message CMD_GR_ConfigServer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_ConfigServer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_ConfigServer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_ConfigServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_ConfigServer;

        /**
         * Decodes a CMD_GR_ConfigServer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_ConfigServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_ConfigServer;

        /**
         * Verifies a CMD_GR_ConfigServer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_ConfigServer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_ConfigServer
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_ConfigServer;

        /**
         * Creates a plain object from a CMD_GR_ConfigServer message. Also converts values to other types if specified.
         * @param message CMD_GR_ConfigServer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_ConfigServer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_ConfigServer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GR_UserLookon. */
    interface ICMD_GR_UserLookon {

        /** < 桌子位置 */
        tableid: number;

        /** < 椅子位置 */
        chairid: number;
    }

    /** Represents a CMD_GR_UserLookon. */
    class CMD_GR_UserLookon implements ICMD_GR_UserLookon {

        /**
         * Constructs a new CMD_GR_UserLookon.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_UserLookon);

        /** < 桌子位置 */
        public tableid: number;

        /** < 椅子位置 */
        public chairid: number;

        /**
         * Creates a new CMD_GR_UserLookon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_UserLookon instance
         */
        public static create(properties?: GameSvr.ICMD_GR_UserLookon): GameSvr.CMD_GR_UserLookon;

        /**
         * Encodes the specified CMD_GR_UserLookon message. Does not implicitly {@link GameSvr.CMD_GR_UserLookon.verify|verify} messages.
         * @param message CMD_GR_UserLookon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_UserLookon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_UserLookon message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_UserLookon.verify|verify} messages.
         * @param message CMD_GR_UserLookon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_UserLookon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_UserLookon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_UserLookon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_UserLookon;

        /**
         * Decodes a CMD_GR_UserLookon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_UserLookon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_UserLookon;

        /**
         * Verifies a CMD_GR_UserLookon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_UserLookon message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_UserLookon
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_UserLookon;

        /**
         * Creates a plain object from a CMD_GR_UserLookon message. Also converts values to other types if specified.
         * @param message CMD_GR_UserLookon
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_UserLookon, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_UserLookon to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GR_UserSitDown. */
    interface ICMD_GR_UserSitDown {

        /** < 桌子位置 */
        tableid: number;

        /** < 椅子位置 */
        chairid: number;

        /** < 桌子密码 */
        password?: (string | null);
    }

    /** Represents a CMD_GR_UserSitDown. */
    class CMD_GR_UserSitDown implements ICMD_GR_UserSitDown {

        /**
         * Constructs a new CMD_GR_UserSitDown.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_UserSitDown);

        /** < 桌子位置 */
        public tableid: number;

        /** < 椅子位置 */
        public chairid: number;

        /** < 桌子密码 */
        public password?: (string | null);

        /** CMD_GR_UserSitDown _password. */
        public _password?: "password";

        /**
         * Creates a new CMD_GR_UserSitDown instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_UserSitDown instance
         */
        public static create(properties?: GameSvr.ICMD_GR_UserSitDown): GameSvr.CMD_GR_UserSitDown;

        /**
         * Encodes the specified CMD_GR_UserSitDown message. Does not implicitly {@link GameSvr.CMD_GR_UserSitDown.verify|verify} messages.
         * @param message CMD_GR_UserSitDown message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_UserSitDown, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_UserSitDown message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_UserSitDown.verify|verify} messages.
         * @param message CMD_GR_UserSitDown message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_UserSitDown, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_UserSitDown message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_UserSitDown
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_UserSitDown;

        /**
         * Decodes a CMD_GR_UserSitDown message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_UserSitDown
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_UserSitDown;

        /**
         * Verifies a CMD_GR_UserSitDown message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_UserSitDown message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_UserSitDown
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_UserSitDown;

        /**
         * Creates a plain object from a CMD_GR_UserSitDown message. Also converts values to other types if specified.
         * @param message CMD_GR_UserSitDown
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_UserSitDown, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_UserSitDown to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GR_UserStandUp. */
    interface ICMD_GR_UserStandUp {

        /** < 桌子位置 */
        tableid: number;

        /** < 椅子位置 */
        chairid: number;

        /** < 强行离开 */
        forceleave: boolean;
    }

    /** Represents a CMD_GR_UserStandUp. */
    class CMD_GR_UserStandUp implements ICMD_GR_UserStandUp {

        /**
         * Constructs a new CMD_GR_UserStandUp.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_UserStandUp);

        /** < 桌子位置 */
        public tableid: number;

        /** < 椅子位置 */
        public chairid: number;

        /** < 强行离开 */
        public forceleave: boolean;

        /**
         * Creates a new CMD_GR_UserStandUp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_UserStandUp instance
         */
        public static create(properties?: GameSvr.ICMD_GR_UserStandUp): GameSvr.CMD_GR_UserStandUp;

        /**
         * Encodes the specified CMD_GR_UserStandUp message. Does not implicitly {@link GameSvr.CMD_GR_UserStandUp.verify|verify} messages.
         * @param message CMD_GR_UserStandUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_UserStandUp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_UserStandUp message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_UserStandUp.verify|verify} messages.
         * @param message CMD_GR_UserStandUp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_UserStandUp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_UserStandUp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_UserStandUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_UserStandUp;

        /**
         * Decodes a CMD_GR_UserStandUp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_UserStandUp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_UserStandUp;

        /**
         * Verifies a CMD_GR_UserStandUp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_UserStandUp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_UserStandUp
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_UserStandUp;

        /**
         * Creates a plain object from a CMD_GR_UserStandUp message. Also converts values to other types if specified.
         * @param message CMD_GR_UserStandUp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_UserStandUp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_UserStandUp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GR_TableInfo. */
    interface ICMD_GR_TableInfo {

        /** < 桌子状态 */
        vlist?: (Proto_Struct.Itag_TableStatus[] | null);
    }

    /** Represents a CMD_GR_TableInfo. */
    class CMD_GR_TableInfo implements ICMD_GR_TableInfo {

        /**
         * Constructs a new CMD_GR_TableInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_TableInfo);

        /** < 桌子状态 */
        public vlist: Proto_Struct.Itag_TableStatus[];

        /**
         * Creates a new CMD_GR_TableInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_TableInfo instance
         */
        public static create(properties?: GameSvr.ICMD_GR_TableInfo): GameSvr.CMD_GR_TableInfo;

        /**
         * Encodes the specified CMD_GR_TableInfo message. Does not implicitly {@link GameSvr.CMD_GR_TableInfo.verify|verify} messages.
         * @param message CMD_GR_TableInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_TableInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_TableInfo message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_TableInfo.verify|verify} messages.
         * @param message CMD_GR_TableInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_TableInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_TableInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_TableInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_TableInfo;

        /**
         * Decodes a CMD_GR_TableInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_TableInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_TableInfo;

        /**
         * Verifies a CMD_GR_TableInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_TableInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_TableInfo
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_TableInfo;

        /**
         * Creates a plain object from a CMD_GR_TableInfo message. Also converts values to other types if specified.
         * @param message CMD_GR_TableInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_TableInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_TableInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GR_TableStatus. */
    interface ICMD_GR_TableStatus {

        /** < 桌子状态 */
        vdata: Proto_Struct.Itag_TableStatus;
    }

    /** Represents a CMD_GR_TableStatus. */
    class CMD_GR_TableStatus implements ICMD_GR_TableStatus {

        /**
         * Constructs a new CMD_GR_TableStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_TableStatus);

        /** < 桌子状态 */
        public vdata: Proto_Struct.Itag_TableStatus;

        /**
         * Creates a new CMD_GR_TableStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_TableStatus instance
         */
        public static create(properties?: GameSvr.ICMD_GR_TableStatus): GameSvr.CMD_GR_TableStatus;

        /**
         * Encodes the specified CMD_GR_TableStatus message. Does not implicitly {@link GameSvr.CMD_GR_TableStatus.verify|verify} messages.
         * @param message CMD_GR_TableStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_TableStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_TableStatus message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_TableStatus.verify|verify} messages.
         * @param message CMD_GR_TableStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_TableStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_TableStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_TableStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_TableStatus;

        /**
         * Decodes a CMD_GR_TableStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_TableStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_TableStatus;

        /**
         * Verifies a CMD_GR_TableStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_TableStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_TableStatus
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_TableStatus;

        /**
         * Creates a plain object from a CMD_GR_TableStatus message. Also converts values to other types if specified.
         * @param message CMD_GR_TableStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_TableStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_TableStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GF_GameOption. */
    interface ICMD_GF_GameOption {

        /** < 旁观标志 */
        allowlookon: boolean;

        /** < 框架版本 */
        frameversion: number;

        /** < 游戏版本 */
        clientversion: number;
    }

    /** Represents a CMD_GF_GameOption. */
    class CMD_GF_GameOption implements ICMD_GF_GameOption {

        /**
         * Constructs a new CMD_GF_GameOption.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GF_GameOption);

        /** < 旁观标志 */
        public allowlookon: boolean;

        /** < 框架版本 */
        public frameversion: number;

        /** < 游戏版本 */
        public clientversion: number;

        /**
         * Creates a new CMD_GF_GameOption instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GF_GameOption instance
         */
        public static create(properties?: GameSvr.ICMD_GF_GameOption): GameSvr.CMD_GF_GameOption;

        /**
         * Encodes the specified CMD_GF_GameOption message. Does not implicitly {@link GameSvr.CMD_GF_GameOption.verify|verify} messages.
         * @param message CMD_GF_GameOption message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GF_GameOption, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GF_GameOption message, length delimited. Does not implicitly {@link GameSvr.CMD_GF_GameOption.verify|verify} messages.
         * @param message CMD_GF_GameOption message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GF_GameOption, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GF_GameOption message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GF_GameOption
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GF_GameOption;

        /**
         * Decodes a CMD_GF_GameOption message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GF_GameOption
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GF_GameOption;

        /**
         * Verifies a CMD_GF_GameOption message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GF_GameOption message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GF_GameOption
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GF_GameOption;

        /**
         * Creates a plain object from a CMD_GF_GameOption message. Also converts values to other types if specified.
         * @param message CMD_GF_GameOption
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GF_GameOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GF_GameOption to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GF_LookonConfig. */
    interface ICMD_GF_LookonConfig {

        /** < 用户标识 */
        userid: number;

        /** < 允许旁观 */
        allowlookon: boolean;
    }

    /** Represents a CMD_GF_LookonConfig. */
    class CMD_GF_LookonConfig implements ICMD_GF_LookonConfig {

        /**
         * Constructs a new CMD_GF_LookonConfig.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GF_LookonConfig);

        /** < 用户标识 */
        public userid: number;

        /** < 允许旁观 */
        public allowlookon: boolean;

        /**
         * Creates a new CMD_GF_LookonConfig instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GF_LookonConfig instance
         */
        public static create(properties?: GameSvr.ICMD_GF_LookonConfig): GameSvr.CMD_GF_LookonConfig;

        /**
         * Encodes the specified CMD_GF_LookonConfig message. Does not implicitly {@link GameSvr.CMD_GF_LookonConfig.verify|verify} messages.
         * @param message CMD_GF_LookonConfig message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GF_LookonConfig, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GF_LookonConfig message, length delimited. Does not implicitly {@link GameSvr.CMD_GF_LookonConfig.verify|verify} messages.
         * @param message CMD_GF_LookonConfig message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GF_LookonConfig, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GF_LookonConfig message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GF_LookonConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GF_LookonConfig;

        /**
         * Decodes a CMD_GF_LookonConfig message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GF_LookonConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GF_LookonConfig;

        /**
         * Verifies a CMD_GF_LookonConfig message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GF_LookonConfig message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GF_LookonConfig
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GF_LookonConfig;

        /**
         * Creates a plain object from a CMD_GF_LookonConfig message. Also converts values to other types if specified.
         * @param message CMD_GF_LookonConfig
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GF_LookonConfig, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GF_LookonConfig to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GF_LookonStatus. */
    interface ICMD_GF_LookonStatus {

        /** < 允许旁观 */
        allowlookon: boolean;
    }

    /** Represents a CMD_GF_LookonStatus. */
    class CMD_GF_LookonStatus implements ICMD_GF_LookonStatus {

        /**
         * Constructs a new CMD_GF_LookonStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GF_LookonStatus);

        /** < 允许旁观 */
        public allowlookon: boolean;

        /**
         * Creates a new CMD_GF_LookonStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GF_LookonStatus instance
         */
        public static create(properties?: GameSvr.ICMD_GF_LookonStatus): GameSvr.CMD_GF_LookonStatus;

        /**
         * Encodes the specified CMD_GF_LookonStatus message. Does not implicitly {@link GameSvr.CMD_GF_LookonStatus.verify|verify} messages.
         * @param message CMD_GF_LookonStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GF_LookonStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GF_LookonStatus message, length delimited. Does not implicitly {@link GameSvr.CMD_GF_LookonStatus.verify|verify} messages.
         * @param message CMD_GF_LookonStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GF_LookonStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GF_LookonStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GF_LookonStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GF_LookonStatus;

        /**
         * Decodes a CMD_GF_LookonStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GF_LookonStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GF_LookonStatus;

        /**
         * Verifies a CMD_GF_LookonStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GF_LookonStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GF_LookonStatus
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GF_LookonStatus;

        /**
         * Creates a plain object from a CMD_GF_LookonStatus message. Also converts values to other types if specified.
         * @param message CMD_GF_LookonStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GF_LookonStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GF_LookonStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GF_GameStatus. */
    interface ICMD_GF_GameStatus {

        /** < 游戏状态 */
        gamestatus: number;

        /** < 旁观标志 */
        allowlookon: boolean;
    }

    /** Represents a CMD_GF_GameStatus. */
    class CMD_GF_GameStatus implements ICMD_GF_GameStatus {

        /**
         * Constructs a new CMD_GF_GameStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GF_GameStatus);

        /** < 游戏状态 */
        public gamestatus: number;

        /** < 旁观标志 */
        public allowlookon: boolean;

        /**
         * Creates a new CMD_GF_GameStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GF_GameStatus instance
         */
        public static create(properties?: GameSvr.ICMD_GF_GameStatus): GameSvr.CMD_GF_GameStatus;

        /**
         * Encodes the specified CMD_GF_GameStatus message. Does not implicitly {@link GameSvr.CMD_GF_GameStatus.verify|verify} messages.
         * @param message CMD_GF_GameStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GF_GameStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GF_GameStatus message, length delimited. Does not implicitly {@link GameSvr.CMD_GF_GameStatus.verify|verify} messages.
         * @param message CMD_GF_GameStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GF_GameStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GF_GameStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GF_GameStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GF_GameStatus;

        /**
         * Decodes a CMD_GF_GameStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GF_GameStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GF_GameStatus;

        /**
         * Verifies a CMD_GF_GameStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GF_GameStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GF_GameStatus
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GF_GameStatus;

        /**
         * Creates a plain object from a CMD_GF_GameStatus message. Also converts values to other types if specified.
         * @param message CMD_GF_GameStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GF_GameStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GF_GameStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GR_UserStatus. */
    interface ICMD_GR_UserStatus {

        /** < 用户标识 */
        userid: number;

        /** < 用户状态 */
        data: Proto_Struct.Itag_UserStatus;
    }

    /** Represents a CMD_GR_UserStatus. */
    class CMD_GR_UserStatus implements ICMD_GR_UserStatus {

        /**
         * Constructs a new CMD_GR_UserStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_UserStatus);

        /** < 用户标识 */
        public userid: number;

        /** < 用户状态 */
        public data: Proto_Struct.Itag_UserStatus;

        /**
         * Creates a new CMD_GR_UserStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_UserStatus instance
         */
        public static create(properties?: GameSvr.ICMD_GR_UserStatus): GameSvr.CMD_GR_UserStatus;

        /**
         * Encodes the specified CMD_GR_UserStatus message. Does not implicitly {@link GameSvr.CMD_GR_UserStatus.verify|verify} messages.
         * @param message CMD_GR_UserStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_UserStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_UserStatus message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_UserStatus.verify|verify} messages.
         * @param message CMD_GR_UserStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_UserStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_UserStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_UserStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_UserStatus;

        /**
         * Decodes a CMD_GR_UserStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_UserStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_UserStatus;

        /**
         * Verifies a CMD_GR_UserStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_UserStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_UserStatus
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_UserStatus;

        /**
         * Creates a plain object from a CMD_GR_UserStatus message. Also converts values to other types if specified.
         * @param message CMD_GR_UserStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_UserStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_UserStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GR_UserScore. */
    interface ICMD_GR_UserScore {

        /** < 用户标识 */
        userid: number;

        /** < 积分信息 */
        data: Proto_Struct.Itag_UserScore;
    }

    /** Represents a CMD_GR_UserScore. */
    class CMD_GR_UserScore implements ICMD_GR_UserScore {

        /**
         * Constructs a new CMD_GR_UserScore.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_UserScore);

        /** < 用户标识 */
        public userid: number;

        /** < 积分信息 */
        public data: Proto_Struct.Itag_UserScore;

        /**
         * Creates a new CMD_GR_UserScore instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_UserScore instance
         */
        public static create(properties?: GameSvr.ICMD_GR_UserScore): GameSvr.CMD_GR_UserScore;

        /**
         * Encodes the specified CMD_GR_UserScore message. Does not implicitly {@link GameSvr.CMD_GR_UserScore.verify|verify} messages.
         * @param message CMD_GR_UserScore message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_UserScore, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_UserScore message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_UserScore.verify|verify} messages.
         * @param message CMD_GR_UserScore message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_UserScore, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_UserScore message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_UserScore
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_UserScore;

        /**
         * Decodes a CMD_GR_UserScore message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_UserScore
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_UserScore;

        /**
         * Verifies a CMD_GR_UserScore message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_UserScore message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_UserScore
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_UserScore;

        /**
         * Creates a plain object from a CMD_GR_UserScore message. Also converts values to other types if specified.
         * @param message CMD_GR_UserScore
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_UserScore, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_UserScore to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GR_UserRule. */
    interface ICMD_GR_UserRule {

        /** < 规则掩码 */
        rulemask: number;

        /** < 最低胜率 */
        minwinrate: number;

        /** < 最高逃率 */
        maxfleerate: number;

        /** < 最高分数 */
        maxscore: number;

        /** < 最低分数 */
        minscore: number;

        /** < 最低分数 */
        roompass?: (string | null);
    }

    /** Represents a CMD_GR_UserRule. */
    class CMD_GR_UserRule implements ICMD_GR_UserRule {

        /**
         * Constructs a new CMD_GR_UserRule.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_UserRule);

        /** < 规则掩码 */
        public rulemask: number;

        /** < 最低胜率 */
        public minwinrate: number;

        /** < 最高逃率 */
        public maxfleerate: number;

        /** < 最高分数 */
        public maxscore: number;

        /** < 最低分数 */
        public minscore: number;

        /** < 最低分数 */
        public roompass?: (string | null);

        /** CMD_GR_UserRule _roompass. */
        public _roompass?: "roompass";

        /**
         * Creates a new CMD_GR_UserRule instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_UserRule instance
         */
        public static create(properties?: GameSvr.ICMD_GR_UserRule): GameSvr.CMD_GR_UserRule;

        /**
         * Encodes the specified CMD_GR_UserRule message. Does not implicitly {@link GameSvr.CMD_GR_UserRule.verify|verify} messages.
         * @param message CMD_GR_UserRule message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_UserRule, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_UserRule message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_UserRule.verify|verify} messages.
         * @param message CMD_GR_UserRule message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_UserRule, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_UserRule message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_UserRule
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_UserRule;

        /**
         * Decodes a CMD_GR_UserRule message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_UserRule
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_UserRule;

        /**
         * Verifies a CMD_GR_UserRule message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_UserRule message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_UserRule
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_UserRule;

        /**
         * Creates a plain object from a CMD_GR_UserRule message. Also converts values to other types if specified.
         * @param message CMD_GR_UserRule
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_UserRule, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_UserRule to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GR_UserInfoReq. */
    interface ICMD_GR_UserInfoReq {

        /** < 请求用户 */
        useridreq: number;

        /** < 桌子位置 */
        tablepos: number;
    }

    /** Represents a CMD_GR_UserInfoReq. */
    class CMD_GR_UserInfoReq implements ICMD_GR_UserInfoReq {

        /**
         * Constructs a new CMD_GR_UserInfoReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_UserInfoReq);

        /** < 请求用户 */
        public useridreq: number;

        /** < 桌子位置 */
        public tablepos: number;

        /**
         * Creates a new CMD_GR_UserInfoReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_UserInfoReq instance
         */
        public static create(properties?: GameSvr.ICMD_GR_UserInfoReq): GameSvr.CMD_GR_UserInfoReq;

        /**
         * Encodes the specified CMD_GR_UserInfoReq message. Does not implicitly {@link GameSvr.CMD_GR_UserInfoReq.verify|verify} messages.
         * @param message CMD_GR_UserInfoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_UserInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_UserInfoReq message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_UserInfoReq.verify|verify} messages.
         * @param message CMD_GR_UserInfoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_UserInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_UserInfoReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_UserInfoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_UserInfoReq;

        /**
         * Decodes a CMD_GR_UserInfoReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_UserInfoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_UserInfoReq;

        /**
         * Verifies a CMD_GR_UserInfoReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_UserInfoReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_UserInfoReq
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_UserInfoReq;

        /**
         * Creates a plain object from a CMD_GR_UserInfoReq message. Also converts values to other types if specified.
         * @param message CMD_GR_UserInfoReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_UserInfoReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_UserInfoReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GR_ChairUserInfoReq. */
    interface ICMD_GR_ChairUserInfoReq {

        /** < 桌子号码 */
        tableid: number;

        /** < 椅子位置 */
        chairid: number;
    }

    /** Represents a CMD_GR_ChairUserInfoReq. */
    class CMD_GR_ChairUserInfoReq implements ICMD_GR_ChairUserInfoReq {

        /**
         * Constructs a new CMD_GR_ChairUserInfoReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.ICMD_GR_ChairUserInfoReq);

        /** < 桌子号码 */
        public tableid: number;

        /** < 椅子位置 */
        public chairid: number;

        /**
         * Creates a new CMD_GR_ChairUserInfoReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GR_ChairUserInfoReq instance
         */
        public static create(properties?: GameSvr.ICMD_GR_ChairUserInfoReq): GameSvr.CMD_GR_ChairUserInfoReq;

        /**
         * Encodes the specified CMD_GR_ChairUserInfoReq message. Does not implicitly {@link GameSvr.CMD_GR_ChairUserInfoReq.verify|verify} messages.
         * @param message CMD_GR_ChairUserInfoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.ICMD_GR_ChairUserInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GR_ChairUserInfoReq message, length delimited. Does not implicitly {@link GameSvr.CMD_GR_ChairUserInfoReq.verify|verify} messages.
         * @param message CMD_GR_ChairUserInfoReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.ICMD_GR_ChairUserInfoReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GR_ChairUserInfoReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GR_ChairUserInfoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.CMD_GR_ChairUserInfoReq;

        /**
         * Decodes a CMD_GR_ChairUserInfoReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GR_ChairUserInfoReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.CMD_GR_ChairUserInfoReq;

        /**
         * Verifies a CMD_GR_ChairUserInfoReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GR_ChairUserInfoReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GR_ChairUserInfoReq
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.CMD_GR_ChairUserInfoReq;

        /**
         * Creates a plain object from a CMD_GR_ChairUserInfoReq message. Also converts values to other types if specified.
         * @param message CMD_GR_ChairUserInfoReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.CMD_GR_ChairUserInfoReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GR_ChairUserInfoReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a notify_user_enter. */
    interface Inotify_user_enter {

        /** < */
        data: Proto_Struct.Itag_UserInfoHead;
    }

    /** Represents a notify_user_enter. */
    class notify_user_enter implements Inotify_user_enter {

        /**
         * Constructs a new notify_user_enter.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.Inotify_user_enter);

        /** < */
        public data: Proto_Struct.Itag_UserInfoHead;

        /**
         * Creates a new notify_user_enter instance using the specified properties.
         * @param [properties] Properties to set
         * @returns notify_user_enter instance
         */
        public static create(properties?: GameSvr.Inotify_user_enter): GameSvr.notify_user_enter;

        /**
         * Encodes the specified notify_user_enter message. Does not implicitly {@link GameSvr.notify_user_enter.verify|verify} messages.
         * @param message notify_user_enter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.Inotify_user_enter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified notify_user_enter message, length delimited. Does not implicitly {@link GameSvr.notify_user_enter.verify|verify} messages.
         * @param message notify_user_enter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.Inotify_user_enter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a notify_user_enter message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns notify_user_enter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.notify_user_enter;

        /**
         * Decodes a notify_user_enter message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns notify_user_enter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.notify_user_enter;

        /**
         * Verifies a notify_user_enter message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a notify_user_enter message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns notify_user_enter
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.notify_user_enter;

        /**
         * Creates a plain object from a notify_user_enter message. Also converts values to other types if specified.
         * @param message notify_user_enter
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.notify_user_enter, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this notify_user_enter to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a notify_other_users_info. */
    interface Inotify_other_users_info {

        /** notify_other_users_info data */
        data?: (Proto_Struct.Itag_UserInfoHead[] | null);
    }

    /** Represents a notify_other_users_info. */
    class notify_other_users_info implements Inotify_other_users_info {

        /**
         * Constructs a new notify_other_users_info.
         * @param [properties] Properties to set
         */
        constructor(properties?: GameSvr.Inotify_other_users_info);

        /** notify_other_users_info data. */
        public data: Proto_Struct.Itag_UserInfoHead[];

        /**
         * Creates a new notify_other_users_info instance using the specified properties.
         * @param [properties] Properties to set
         * @returns notify_other_users_info instance
         */
        public static create(properties?: GameSvr.Inotify_other_users_info): GameSvr.notify_other_users_info;

        /**
         * Encodes the specified notify_other_users_info message. Does not implicitly {@link GameSvr.notify_other_users_info.verify|verify} messages.
         * @param message notify_other_users_info message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: GameSvr.Inotify_other_users_info, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified notify_other_users_info message, length delimited. Does not implicitly {@link GameSvr.notify_other_users_info.verify|verify} messages.
         * @param message notify_other_users_info message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: GameSvr.Inotify_other_users_info, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a notify_other_users_info message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns notify_other_users_info
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): GameSvr.notify_other_users_info;

        /**
         * Decodes a notify_other_users_info message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns notify_other_users_info
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): GameSvr.notify_other_users_info;

        /**
         * Verifies a notify_other_users_info message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a notify_other_users_info message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns notify_other_users_info
         */
        public static fromObject(object: { [k: string]: any }): GameSvr.notify_other_users_info;

        /**
         * Creates a plain object from a notify_other_users_info message. Also converts values to other types if specified.
         * @param message notify_other_users_info
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: GameSvr.notify_other_users_info, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this notify_other_users_info to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace Proto_Struct. */
declare namespace Proto_Struct {

    /** Properties of a CMD_Failed. */
    interface ICMD_Failed {

        /** < 错误码 */
        code: number;

        /** < 错误消息 */
        msg: string;
    }

    /** Represents a CMD_Failed. */
    class CMD_Failed implements ICMD_Failed {

        /**
         * Constructs a new CMD_Failed.
         * @param [properties] Properties to set
         */
        constructor(properties?: Proto_Struct.ICMD_Failed);

        /** < 错误码 */
        public code: number;

        /** < 错误消息 */
        public msg: string;

        /**
         * Creates a new CMD_Failed instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_Failed instance
         */
        public static create(properties?: Proto_Struct.ICMD_Failed): Proto_Struct.CMD_Failed;

        /**
         * Encodes the specified CMD_Failed message. Does not implicitly {@link Proto_Struct.CMD_Failed.verify|verify} messages.
         * @param message CMD_Failed message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Proto_Struct.ICMD_Failed, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_Failed message, length delimited. Does not implicitly {@link Proto_Struct.CMD_Failed.verify|verify} messages.
         * @param message CMD_Failed message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Proto_Struct.ICMD_Failed, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_Failed message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_Failed
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Proto_Struct.CMD_Failed;

        /**
         * Decodes a CMD_Failed message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_Failed
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Proto_Struct.CMD_Failed;

        /**
         * Verifies a CMD_Failed message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_Failed message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_Failed
         */
        public static fromObject(object: { [k: string]: any }): Proto_Struct.CMD_Failed;

        /**
         * Creates a plain object from a CMD_Failed message. Also converts values to other types if specified.
         * @param message CMD_Failed
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Proto_Struct.CMD_Failed, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_Failed to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a tag_GameType. */
    interface Itag_GameType {

        /** < 挂接索引 */
        joinId: number;

        /** < 排序索引 */
        sortId: number;

        /** < 类型索引 */
        typeId: number;

        /** < 种类名字 */
        typeName: string;
    }

    /** Represents a tag_GameType. */
    class tag_GameType implements Itag_GameType {

        /**
         * Constructs a new tag_GameType.
         * @param [properties] Properties to set
         */
        constructor(properties?: Proto_Struct.Itag_GameType);

        /** < 挂接索引 */
        public joinId: number;

        /** < 排序索引 */
        public sortId: number;

        /** < 类型索引 */
        public typeId: number;

        /** < 种类名字 */
        public typeName: string;

        /**
         * Creates a new tag_GameType instance using the specified properties.
         * @param [properties] Properties to set
         * @returns tag_GameType instance
         */
        public static create(properties?: Proto_Struct.Itag_GameType): Proto_Struct.tag_GameType;

        /**
         * Encodes the specified tag_GameType message. Does not implicitly {@link Proto_Struct.tag_GameType.verify|verify} messages.
         * @param message tag_GameType message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Proto_Struct.Itag_GameType, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified tag_GameType message, length delimited. Does not implicitly {@link Proto_Struct.tag_GameType.verify|verify} messages.
         * @param message tag_GameType message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Proto_Struct.Itag_GameType, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a tag_GameType message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns tag_GameType
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Proto_Struct.tag_GameType;

        /**
         * Decodes a tag_GameType message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns tag_GameType
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Proto_Struct.tag_GameType;

        /**
         * Verifies a tag_GameType message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a tag_GameType message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns tag_GameType
         */
        public static fromObject(object: { [k: string]: any }): Proto_Struct.tag_GameType;

        /**
         * Creates a plain object from a tag_GameType message. Also converts values to other types if specified.
         * @param message tag_GameType
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Proto_Struct.tag_GameType, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this tag_GameType to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a tag_GameNode. */
    interface Itag_GameNode {

        /** < 名称索引 */
        kindId: number;

        /** < 挂接索引 */
        joinId: number;

        /** < 排序索引 */
        sortId: number;

        /** < 节点索引 */
        nodeId: number;

        /** < 节点名称 */
        nodeName: string;
    }

    /** Represents a tag_GameNode. */
    class tag_GameNode implements Itag_GameNode {

        /**
         * Constructs a new tag_GameNode.
         * @param [properties] Properties to set
         */
        constructor(properties?: Proto_Struct.Itag_GameNode);

        /** < 名称索引 */
        public kindId: number;

        /** < 挂接索引 */
        public joinId: number;

        /** < 排序索引 */
        public sortId: number;

        /** < 节点索引 */
        public nodeId: number;

        /** < 节点名称 */
        public nodeName: string;

        /**
         * Creates a new tag_GameNode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns tag_GameNode instance
         */
        public static create(properties?: Proto_Struct.Itag_GameNode): Proto_Struct.tag_GameNode;

        /**
         * Encodes the specified tag_GameNode message. Does not implicitly {@link Proto_Struct.tag_GameNode.verify|verify} messages.
         * @param message tag_GameNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Proto_Struct.Itag_GameNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified tag_GameNode message, length delimited. Does not implicitly {@link Proto_Struct.tag_GameNode.verify|verify} messages.
         * @param message tag_GameNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Proto_Struct.Itag_GameNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a tag_GameNode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns tag_GameNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Proto_Struct.tag_GameNode;

        /**
         * Decodes a tag_GameNode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns tag_GameNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Proto_Struct.tag_GameNode;

        /**
         * Verifies a tag_GameNode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a tag_GameNode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns tag_GameNode
         */
        public static fromObject(object: { [k: string]: any }): Proto_Struct.tag_GameNode;

        /**
         * Creates a plain object from a tag_GameNode message. Also converts values to other types if specified.
         * @param message tag_GameNode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Proto_Struct.tag_GameNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this tag_GameNode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a tag_GamePage. */
    interface Itag_GamePage {

        /** < 页面索引 */
        pageId: number;

        /** < 名称索引 */
        kindId: number;

        /** < 节点索引 */
        nodeId: number;

        /** < 排序索引 */
        sortId: number;

        /** < 控制类型 */
        operateType: number;

        /** < 显示名称 */
        displayName: string;
    }

    /** Represents a tag_GamePage. */
    class tag_GamePage implements Itag_GamePage {

        /**
         * Constructs a new tag_GamePage.
         * @param [properties] Properties to set
         */
        constructor(properties?: Proto_Struct.Itag_GamePage);

        /** < 页面索引 */
        public pageId: number;

        /** < 名称索引 */
        public kindId: number;

        /** < 节点索引 */
        public nodeId: number;

        /** < 排序索引 */
        public sortId: number;

        /** < 控制类型 */
        public operateType: number;

        /** < 显示名称 */
        public displayName: string;

        /**
         * Creates a new tag_GamePage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns tag_GamePage instance
         */
        public static create(properties?: Proto_Struct.Itag_GamePage): Proto_Struct.tag_GamePage;

        /**
         * Encodes the specified tag_GamePage message. Does not implicitly {@link Proto_Struct.tag_GamePage.verify|verify} messages.
         * @param message tag_GamePage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Proto_Struct.Itag_GamePage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified tag_GamePage message, length delimited. Does not implicitly {@link Proto_Struct.tag_GamePage.verify|verify} messages.
         * @param message tag_GamePage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Proto_Struct.Itag_GamePage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a tag_GamePage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns tag_GamePage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Proto_Struct.tag_GamePage;

        /**
         * Decodes a tag_GamePage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns tag_GamePage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Proto_Struct.tag_GamePage;

        /**
         * Verifies a tag_GamePage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a tag_GamePage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns tag_GamePage
         */
        public static fromObject(object: { [k: string]: any }): Proto_Struct.tag_GamePage;

        /**
         * Creates a plain object from a tag_GamePage message. Also converts values to other types if specified.
         * @param message tag_GamePage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Proto_Struct.tag_GamePage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this tag_GamePage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a tag_GameKind. */
    interface Itag_GameKind {

        /** tag_GameKind typeId */
        typeId: number;

        /** tag_GameKind joinId */
        joinId: number;

        /** tag_GameKind sortId */
        sortId: number;

        /** tag_GameKind kindId */
        kindId: number;

        /** tag_GameKind gameId */
        gameId: number;

        /** tag_GameKind onlineCount */
        onlineCount: number;

        /** tag_GameKind androidCount */
        androidCount: number;

        /** tag_GameKind fullcount */
        fullcount: number;

        /** tag_GameKind kindName */
        kindName: string;

        /** tag_GameKind processName */
        processName: string;
    }

    /** Represents a tag_GameKind. */
    class tag_GameKind implements Itag_GameKind {

        /**
         * Constructs a new tag_GameKind.
         * @param [properties] Properties to set
         */
        constructor(properties?: Proto_Struct.Itag_GameKind);

        /** tag_GameKind typeId. */
        public typeId: number;

        /** tag_GameKind joinId. */
        public joinId: number;

        /** tag_GameKind sortId. */
        public sortId: number;

        /** tag_GameKind kindId. */
        public kindId: number;

        /** tag_GameKind gameId. */
        public gameId: number;

        /** tag_GameKind onlineCount. */
        public onlineCount: number;

        /** tag_GameKind androidCount. */
        public androidCount: number;

        /** tag_GameKind fullcount. */
        public fullcount: number;

        /** tag_GameKind kindName. */
        public kindName: string;

        /** tag_GameKind processName. */
        public processName: string;

        /**
         * Creates a new tag_GameKind instance using the specified properties.
         * @param [properties] Properties to set
         * @returns tag_GameKind instance
         */
        public static create(properties?: Proto_Struct.Itag_GameKind): Proto_Struct.tag_GameKind;

        /**
         * Encodes the specified tag_GameKind message. Does not implicitly {@link Proto_Struct.tag_GameKind.verify|verify} messages.
         * @param message tag_GameKind message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Proto_Struct.Itag_GameKind, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified tag_GameKind message, length delimited. Does not implicitly {@link Proto_Struct.tag_GameKind.verify|verify} messages.
         * @param message tag_GameKind message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Proto_Struct.Itag_GameKind, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a tag_GameKind message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns tag_GameKind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Proto_Struct.tag_GameKind;

        /**
         * Decodes a tag_GameKind message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns tag_GameKind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Proto_Struct.tag_GameKind;

        /**
         * Verifies a tag_GameKind message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a tag_GameKind message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns tag_GameKind
         */
        public static fromObject(object: { [k: string]: any }): Proto_Struct.tag_GameKind;

        /**
         * Creates a plain object from a tag_GameKind message. Also converts values to other types if specified.
         * @param message tag_GameKind
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Proto_Struct.tag_GameKind, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this tag_GameKind to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a tag_GameServer. */
    interface Itag_GameServer {

        /** tag_GameServer kindId */
        kindId: number;

        /** tag_GameServer nodeId */
        nodeId: number;

        /** tag_GameServer sortId */
        sortId: number;

        /** tag_GameServer serverId */
        serverId: number;

        /** tag_GameServer serverKind */
        serverKind: number;

        /** tag_GameServer serverType */
        serverType: number;

        /** tag_GameServer serverPort */
        serverPort: number;

        /** tag_GameServer cellscore */
        cellscore: number;

        /** tag_GameServer enterscore */
        enterscore: number;

        /** tag_GameServer serverRule */
        serverRule: number;

        /** tag_GameServer onlineCount */
        onlineCount: number;

        /** tag_GameServer androidCount */
        androidCount: number;

        /** tag_GameServer fullCount */
        fullCount: number;

        /** tag_GameServer serverAddr */
        serverAddr: string;

        /** tag_GameServer serverName */
        serverName: string;
    }

    /** Represents a tag_GameServer. */
    class tag_GameServer implements Itag_GameServer {

        /**
         * Constructs a new tag_GameServer.
         * @param [properties] Properties to set
         */
        constructor(properties?: Proto_Struct.Itag_GameServer);

        /** tag_GameServer kindId. */
        public kindId: number;

        /** tag_GameServer nodeId. */
        public nodeId: number;

        /** tag_GameServer sortId. */
        public sortId: number;

        /** tag_GameServer serverId. */
        public serverId: number;

        /** tag_GameServer serverKind. */
        public serverKind: number;

        /** tag_GameServer serverType. */
        public serverType: number;

        /** tag_GameServer serverPort. */
        public serverPort: number;

        /** tag_GameServer cellscore. */
        public cellscore: number;

        /** tag_GameServer enterscore. */
        public enterscore: number;

        /** tag_GameServer serverRule. */
        public serverRule: number;

        /** tag_GameServer onlineCount. */
        public onlineCount: number;

        /** tag_GameServer androidCount. */
        public androidCount: number;

        /** tag_GameServer fullCount. */
        public fullCount: number;

        /** tag_GameServer serverAddr. */
        public serverAddr: string;

        /** tag_GameServer serverName. */
        public serverName: string;

        /**
         * Creates a new tag_GameServer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns tag_GameServer instance
         */
        public static create(properties?: Proto_Struct.Itag_GameServer): Proto_Struct.tag_GameServer;

        /**
         * Encodes the specified tag_GameServer message. Does not implicitly {@link Proto_Struct.tag_GameServer.verify|verify} messages.
         * @param message tag_GameServer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Proto_Struct.Itag_GameServer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified tag_GameServer message, length delimited. Does not implicitly {@link Proto_Struct.tag_GameServer.verify|verify} messages.
         * @param message tag_GameServer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Proto_Struct.Itag_GameServer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a tag_GameServer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns tag_GameServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Proto_Struct.tag_GameServer;

        /**
         * Decodes a tag_GameServer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns tag_GameServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Proto_Struct.tag_GameServer;

        /**
         * Verifies a tag_GameServer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a tag_GameServer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns tag_GameServer
         */
        public static fromObject(object: { [k: string]: any }): Proto_Struct.tag_GameServer;

        /**
         * Creates a plain object from a tag_GameServer message. Also converts values to other types if specified.
         * @param message tag_GameServer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Proto_Struct.tag_GameServer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this tag_GameServer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a tag_TableStatus. */
    interface Itag_TableStatus {

        /** < 桌子ID */
        tableid: number;

        /** < 单元积分 */
        cellscore: number;

        /** < 锁定标志 */
        tablelock: boolean;

        /** < 游戏标志 */
        playstatus: boolean;
    }

    /** Represents a tag_TableStatus. */
    class tag_TableStatus implements Itag_TableStatus {

        /**
         * Constructs a new tag_TableStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: Proto_Struct.Itag_TableStatus);

        /** < 桌子ID */
        public tableid: number;

        /** < 单元积分 */
        public cellscore: number;

        /** < 锁定标志 */
        public tablelock: boolean;

        /** < 游戏标志 */
        public playstatus: boolean;

        /**
         * Creates a new tag_TableStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns tag_TableStatus instance
         */
        public static create(properties?: Proto_Struct.Itag_TableStatus): Proto_Struct.tag_TableStatus;

        /**
         * Encodes the specified tag_TableStatus message. Does not implicitly {@link Proto_Struct.tag_TableStatus.verify|verify} messages.
         * @param message tag_TableStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Proto_Struct.Itag_TableStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified tag_TableStatus message, length delimited. Does not implicitly {@link Proto_Struct.tag_TableStatus.verify|verify} messages.
         * @param message tag_TableStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Proto_Struct.Itag_TableStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a tag_TableStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns tag_TableStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Proto_Struct.tag_TableStatus;

        /**
         * Decodes a tag_TableStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns tag_TableStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Proto_Struct.tag_TableStatus;

        /**
         * Verifies a tag_TableStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a tag_TableStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns tag_TableStatus
         */
        public static fromObject(object: { [k: string]: any }): Proto_Struct.tag_TableStatus;

        /**
         * Creates a plain object from a tag_TableStatus message. Also converts values to other types if specified.
         * @param message tag_TableStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Proto_Struct.tag_TableStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this tag_TableStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a tag_UserInfoHead. */
    interface Itag_UserInfoHead {

        /** < 游戏 I D */
        gameid: number;

        /** < 用户 I D */
        userid: number;

        /** < 社团 I D */
        groupid: number;

        /** < 头像索引 */
        faceid: number;

        /** < 自定标识 */
        customid: number;

        /** < 用户性别 */
        gender: number;

        /** < 会员等级 */
        memberorder: number;

        /** < 管理等级 */
        masterorder: number;

        /** < 桌子索引 */
        tableid: number;

        /** < 椅子索引 */
        chairid: number;

        /** < 用户状态 */
        userStatus: number;

        /** < 用户分数 */
        score: (number | Long);

        /** < 用户成绩 */
        grade: (number | Long);

        /** < 用户银行 */
        insure: (number | Long);

        /** < 用户元宝 */
        ingot: (number | Long);

        /** < 胜利盘数 */
        wincount: number;

        /** < 失败盘数 */
        lostcount: number;

        /** < 和局盘数 */
        drawcount: number;

        /** < 逃跑盘数 */
        fleecount: number;

        /** < 用户经验 */
        experience: number;

        /** < 用户魅力 */
        loveliness: number;

        /** < 用户昵称 */
        nickname: string;

        /** < 是否机器人 */
        robot?: (boolean | null);
    }

    /** Represents a tag_UserInfoHead. */
    class tag_UserInfoHead implements Itag_UserInfoHead {

        /**
         * Constructs a new tag_UserInfoHead.
         * @param [properties] Properties to set
         */
        constructor(properties?: Proto_Struct.Itag_UserInfoHead);

        /** < 游戏 I D */
        public gameid: number;

        /** < 用户 I D */
        public userid: number;

        /** < 社团 I D */
        public groupid: number;

        /** < 头像索引 */
        public faceid: number;

        /** < 自定标识 */
        public customid: number;

        /** < 用户性别 */
        public gender: number;

        /** < 会员等级 */
        public memberorder: number;

        /** < 管理等级 */
        public masterorder: number;

        /** < 桌子索引 */
        public tableid: number;

        /** < 椅子索引 */
        public chairid: number;

        /** < 用户状态 */
        public userStatus: number;

        /** < 用户分数 */
        public score: (number | Long);

        /** < 用户成绩 */
        public grade: (number | Long);

        /** < 用户银行 */
        public insure: (number | Long);

        /** < 用户元宝 */
        public ingot: (number | Long);

        /** < 胜利盘数 */
        public wincount: number;

        /** < 失败盘数 */
        public lostcount: number;

        /** < 和局盘数 */
        public drawcount: number;

        /** < 逃跑盘数 */
        public fleecount: number;

        /** < 用户经验 */
        public experience: number;

        /** < 用户魅力 */
        public loveliness: number;

        /** < 用户昵称 */
        public nickname: string;

        /** < 是否机器人 */
        public robot?: (boolean | null);

        /** tag_UserInfoHead _robot. */
        public _robot?: "robot";

        /**
         * Creates a new tag_UserInfoHead instance using the specified properties.
         * @param [properties] Properties to set
         * @returns tag_UserInfoHead instance
         */
        public static create(properties?: Proto_Struct.Itag_UserInfoHead): Proto_Struct.tag_UserInfoHead;

        /**
         * Encodes the specified tag_UserInfoHead message. Does not implicitly {@link Proto_Struct.tag_UserInfoHead.verify|verify} messages.
         * @param message tag_UserInfoHead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Proto_Struct.Itag_UserInfoHead, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified tag_UserInfoHead message, length delimited. Does not implicitly {@link Proto_Struct.tag_UserInfoHead.verify|verify} messages.
         * @param message tag_UserInfoHead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Proto_Struct.Itag_UserInfoHead, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a tag_UserInfoHead message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns tag_UserInfoHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Proto_Struct.tag_UserInfoHead;

        /**
         * Decodes a tag_UserInfoHead message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns tag_UserInfoHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Proto_Struct.tag_UserInfoHead;

        /**
         * Verifies a tag_UserInfoHead message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a tag_UserInfoHead message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns tag_UserInfoHead
         */
        public static fromObject(object: { [k: string]: any }): Proto_Struct.tag_UserInfoHead;

        /**
         * Creates a plain object from a tag_UserInfoHead message. Also converts values to other types if specified.
         * @param message tag_UserInfoHead
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Proto_Struct.tag_UserInfoHead, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this tag_UserInfoHead to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a tag_UserStatus. */
    interface Itag_UserStatus {

        /** < 桌子索引 */
        tableid: number;

        /** < 椅子位置 */
        chairid: number;

        /** < 用户状态 */
        userStatus: number;
    }

    /** Represents a tag_UserStatus. */
    class tag_UserStatus implements Itag_UserStatus {

        /**
         * Constructs a new tag_UserStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: Proto_Struct.Itag_UserStatus);

        /** < 桌子索引 */
        public tableid: number;

        /** < 椅子位置 */
        public chairid: number;

        /** < 用户状态 */
        public userStatus: number;

        /**
         * Creates a new tag_UserStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns tag_UserStatus instance
         */
        public static create(properties?: Proto_Struct.Itag_UserStatus): Proto_Struct.tag_UserStatus;

        /**
         * Encodes the specified tag_UserStatus message. Does not implicitly {@link Proto_Struct.tag_UserStatus.verify|verify} messages.
         * @param message tag_UserStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Proto_Struct.Itag_UserStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified tag_UserStatus message, length delimited. Does not implicitly {@link Proto_Struct.tag_UserStatus.verify|verify} messages.
         * @param message tag_UserStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Proto_Struct.Itag_UserStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a tag_UserStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns tag_UserStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Proto_Struct.tag_UserStatus;

        /**
         * Decodes a tag_UserStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns tag_UserStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Proto_Struct.tag_UserStatus;

        /**
         * Verifies a tag_UserStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a tag_UserStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns tag_UserStatus
         */
        public static fromObject(object: { [k: string]: any }): Proto_Struct.tag_UserStatus;

        /**
         * Creates a plain object from a tag_UserStatus message. Also converts values to other types if specified.
         * @param message tag_UserStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Proto_Struct.tag_UserStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this tag_UserStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a tag_UserScore. */
    interface Itag_UserScore {

        /** < 用户分数 */
        score: (number | Long);

        /** < 用户成绩 */
        grade: (number | Long);

        /** < 用户银行 */
        insure: (number | Long);

        /** < 用户元宝 */
        ingot: (number | Long);

        /** < 胜利盘数 */
        wincount: number;

        /** < 失败盘数 */
        lostcount: number;

        /** < 和局盘数 */
        drawcount: number;

        /** < 逃跑盘数 */
        fleecount: number;

        /** < 用户经验 */
        experience: number;

        /** < 用户魅力 */
        loveliness: number;
    }

    /** Represents a tag_UserScore. */
    class tag_UserScore implements Itag_UserScore {

        /**
         * Constructs a new tag_UserScore.
         * @param [properties] Properties to set
         */
        constructor(properties?: Proto_Struct.Itag_UserScore);

        /** < 用户分数 */
        public score: (number | Long);

        /** < 用户成绩 */
        public grade: (number | Long);

        /** < 用户银行 */
        public insure: (number | Long);

        /** < 用户元宝 */
        public ingot: (number | Long);

        /** < 胜利盘数 */
        public wincount: number;

        /** < 失败盘数 */
        public lostcount: number;

        /** < 和局盘数 */
        public drawcount: number;

        /** < 逃跑盘数 */
        public fleecount: number;

        /** < 用户经验 */
        public experience: number;

        /** < 用户魅力 */
        public loveliness: number;

        /**
         * Creates a new tag_UserScore instance using the specified properties.
         * @param [properties] Properties to set
         * @returns tag_UserScore instance
         */
        public static create(properties?: Proto_Struct.Itag_UserScore): Proto_Struct.tag_UserScore;

        /**
         * Encodes the specified tag_UserScore message. Does not implicitly {@link Proto_Struct.tag_UserScore.verify|verify} messages.
         * @param message tag_UserScore message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Proto_Struct.Itag_UserScore, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified tag_UserScore message, length delimited. Does not implicitly {@link Proto_Struct.tag_UserScore.verify|verify} messages.
         * @param message tag_UserScore message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Proto_Struct.Itag_UserScore, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a tag_UserScore message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns tag_UserScore
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): Proto_Struct.tag_UserScore;

        /**
         * Decodes a tag_UserScore message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns tag_UserScore
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): Proto_Struct.tag_UserScore;

        /**
         * Verifies a tag_UserScore message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a tag_UserScore message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns tag_UserScore
         */
        public static fromObject(object: { [k: string]: any }): Proto_Struct.tag_UserScore;

        /**
         * Creates a plain object from a tag_UserScore message. Also converts values to other types if specified.
         * @param message tag_UserScore
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Proto_Struct.tag_UserScore, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this tag_UserScore to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}

/** Namespace LogonSvr. */
declare namespace LogonSvr {

    /** Properties of a CMD_UserLogonByUserName. */
    interface ICMD_UserLogonByUserName {

        /** < 用户名 */
        user: string;

        /** < 密码 */
        pass: string;

        /** < 客户端类型 */
        device?: (number | null);
    }

    /** Represents a CMD_UserLogonByUserName. */
    class CMD_UserLogonByUserName implements ICMD_UserLogonByUserName {

        /**
         * Constructs a new CMD_UserLogonByUserName.
         * @param [properties] Properties to set
         */
        constructor(properties?: LogonSvr.ICMD_UserLogonByUserName);

        /** < 用户名 */
        public user: string;

        /** < 密码 */
        public pass: string;

        /** < 客户端类型 */
        public device?: (number | null);

        /** CMD_UserLogonByUserName _device. */
        public _device?: "device";

        /**
         * Creates a new CMD_UserLogonByUserName instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_UserLogonByUserName instance
         */
        public static create(properties?: LogonSvr.ICMD_UserLogonByUserName): LogonSvr.CMD_UserLogonByUserName;

        /**
         * Encodes the specified CMD_UserLogonByUserName message. Does not implicitly {@link LogonSvr.CMD_UserLogonByUserName.verify|verify} messages.
         * @param message CMD_UserLogonByUserName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: LogonSvr.ICMD_UserLogonByUserName, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_UserLogonByUserName message, length delimited. Does not implicitly {@link LogonSvr.CMD_UserLogonByUserName.verify|verify} messages.
         * @param message CMD_UserLogonByUserName message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: LogonSvr.ICMD_UserLogonByUserName, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_UserLogonByUserName message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_UserLogonByUserName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): LogonSvr.CMD_UserLogonByUserName;

        /**
         * Decodes a CMD_UserLogonByUserName message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_UserLogonByUserName
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): LogonSvr.CMD_UserLogonByUserName;

        /**
         * Verifies a CMD_UserLogonByUserName message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_UserLogonByUserName message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_UserLogonByUserName
         */
        public static fromObject(object: { [k: string]: any }): LogonSvr.CMD_UserLogonByUserName;

        /**
         * Creates a plain object from a CMD_UserLogonByUserName message. Also converts values to other types if specified.
         * @param message CMD_UserLogonByUserName
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: LogonSvr.CMD_UserLogonByUserName, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_UserLogonByUserName to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_UserLogonByToken. */
    interface ICMD_UserLogonByToken {

        /** < 登陆用的令牌 */
        token: string;

        /** < 客户端类型 */
        device?: (number | null);
    }

    /** Represents a CMD_UserLogonByToken. */
    class CMD_UserLogonByToken implements ICMD_UserLogonByToken {

        /**
         * Constructs a new CMD_UserLogonByToken.
         * @param [properties] Properties to set
         */
        constructor(properties?: LogonSvr.ICMD_UserLogonByToken);

        /** < 登陆用的令牌 */
        public token: string;

        /** < 客户端类型 */
        public device?: (number | null);

        /** CMD_UserLogonByToken _device. */
        public _device?: "device";

        /**
         * Creates a new CMD_UserLogonByToken instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_UserLogonByToken instance
         */
        public static create(properties?: LogonSvr.ICMD_UserLogonByToken): LogonSvr.CMD_UserLogonByToken;

        /**
         * Encodes the specified CMD_UserLogonByToken message. Does not implicitly {@link LogonSvr.CMD_UserLogonByToken.verify|verify} messages.
         * @param message CMD_UserLogonByToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: LogonSvr.ICMD_UserLogonByToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_UserLogonByToken message, length delimited. Does not implicitly {@link LogonSvr.CMD_UserLogonByToken.verify|verify} messages.
         * @param message CMD_UserLogonByToken message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: LogonSvr.ICMD_UserLogonByToken, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_UserLogonByToken message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_UserLogonByToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): LogonSvr.CMD_UserLogonByToken;

        /**
         * Decodes a CMD_UserLogonByToken message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_UserLogonByToken
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): LogonSvr.CMD_UserLogonByToken;

        /**
         * Verifies a CMD_UserLogonByToken message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_UserLogonByToken message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_UserLogonByToken
         */
        public static fromObject(object: { [k: string]: any }): LogonSvr.CMD_UserLogonByToken;

        /**
         * Creates a plain object from a CMD_UserLogonByToken message. Also converts values to other types if specified.
         * @param message CMD_UserLogonByToken
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: LogonSvr.CMD_UserLogonByToken, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_UserLogonByToken to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GP_LogonSuccess. */
    interface ICMD_GP_LogonSuccess {

        /** < 用户ID */
        userid: number;

        /** < 用户ID */
        gameid: number;

        /** < 用户名 */
        accounts: string;

        /** < 用户名 */
        nickname: string;

        /** < 头像ID */
        head: string;

        /** < 性别 */
        gender: number;

        /** < 经验值 */
        exp: (number | Long);

        /** < 钻石 */
        score: (number | Long);

        /** < 用户银行 */
        insure: (number | Long);

        /** < 用户元宝 */
        ingot: (number | Long);

        /** < 用户游戏豆 */
        beans: (number | Long);

        /** < 动态密码 */
        dynamicPass: string;

        /** < 银行使能标识 */
        insureEnabled: number;
    }

    /** Represents a CMD_GP_LogonSuccess. */
    class CMD_GP_LogonSuccess implements ICMD_GP_LogonSuccess {

        /**
         * Constructs a new CMD_GP_LogonSuccess.
         * @param [properties] Properties to set
         */
        constructor(properties?: LogonSvr.ICMD_GP_LogonSuccess);

        /** < 用户ID */
        public userid: number;

        /** < 用户ID */
        public gameid: number;

        /** < 用户名 */
        public accounts: string;

        /** < 用户名 */
        public nickname: string;

        /** < 头像ID */
        public head: string;

        /** < 性别 */
        public gender: number;

        /** < 经验值 */
        public exp: (number | Long);

        /** < 钻石 */
        public score: (number | Long);

        /** < 用户银行 */
        public insure: (number | Long);

        /** < 用户元宝 */
        public ingot: (number | Long);

        /** < 用户游戏豆 */
        public beans: (number | Long);

        /** < 动态密码 */
        public dynamicPass: string;

        /** < 银行使能标识 */
        public insureEnabled: number;

        /**
         * Creates a new CMD_GP_LogonSuccess instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GP_LogonSuccess instance
         */
        public static create(properties?: LogonSvr.ICMD_GP_LogonSuccess): LogonSvr.CMD_GP_LogonSuccess;

        /**
         * Encodes the specified CMD_GP_LogonSuccess message. Does not implicitly {@link LogonSvr.CMD_GP_LogonSuccess.verify|verify} messages.
         * @param message CMD_GP_LogonSuccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: LogonSvr.ICMD_GP_LogonSuccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GP_LogonSuccess message, length delimited. Does not implicitly {@link LogonSvr.CMD_GP_LogonSuccess.verify|verify} messages.
         * @param message CMD_GP_LogonSuccess message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: LogonSvr.ICMD_GP_LogonSuccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GP_LogonSuccess message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GP_LogonSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): LogonSvr.CMD_GP_LogonSuccess;

        /**
         * Decodes a CMD_GP_LogonSuccess message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GP_LogonSuccess
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): LogonSvr.CMD_GP_LogonSuccess;

        /**
         * Verifies a CMD_GP_LogonSuccess message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GP_LogonSuccess message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GP_LogonSuccess
         */
        public static fromObject(object: { [k: string]: any }): LogonSvr.CMD_GP_LogonSuccess;

        /**
         * Creates a plain object from a CMD_GP_LogonSuccess message. Also converts values to other types if specified.
         * @param message CMD_GP_LogonSuccess
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: LogonSvr.CMD_GP_LogonSuccess, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GP_LogonSuccess to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GameType. */
    interface ICMD_GameType {

        /** CMD_GameType vlist */
        vlist?: (Proto_Struct.Itag_GameType[] | null);
    }

    /** Represents a CMD_GameType. */
    class CMD_GameType implements ICMD_GameType {

        /**
         * Constructs a new CMD_GameType.
         * @param [properties] Properties to set
         */
        constructor(properties?: LogonSvr.ICMD_GameType);

        /** CMD_GameType vlist. */
        public vlist: Proto_Struct.Itag_GameType[];

        /**
         * Creates a new CMD_GameType instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GameType instance
         */
        public static create(properties?: LogonSvr.ICMD_GameType): LogonSvr.CMD_GameType;

        /**
         * Encodes the specified CMD_GameType message. Does not implicitly {@link LogonSvr.CMD_GameType.verify|verify} messages.
         * @param message CMD_GameType message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: LogonSvr.ICMD_GameType, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GameType message, length delimited. Does not implicitly {@link LogonSvr.CMD_GameType.verify|verify} messages.
         * @param message CMD_GameType message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: LogonSvr.ICMD_GameType, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GameType message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GameType
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): LogonSvr.CMD_GameType;

        /**
         * Decodes a CMD_GameType message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GameType
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): LogonSvr.CMD_GameType;

        /**
         * Verifies a CMD_GameType message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GameType message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GameType
         */
        public static fromObject(object: { [k: string]: any }): LogonSvr.CMD_GameType;

        /**
         * Creates a plain object from a CMD_GameType message. Also converts values to other types if specified.
         * @param message CMD_GameType
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: LogonSvr.CMD_GameType, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GameType to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GameNode. */
    interface ICMD_GameNode {

        /** CMD_GameNode vlist */
        vlist?: (Proto_Struct.Itag_GameNode[] | null);
    }

    /** Represents a CMD_GameNode. */
    class CMD_GameNode implements ICMD_GameNode {

        /**
         * Constructs a new CMD_GameNode.
         * @param [properties] Properties to set
         */
        constructor(properties?: LogonSvr.ICMD_GameNode);

        /** CMD_GameNode vlist. */
        public vlist: Proto_Struct.Itag_GameNode[];

        /**
         * Creates a new CMD_GameNode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GameNode instance
         */
        public static create(properties?: LogonSvr.ICMD_GameNode): LogonSvr.CMD_GameNode;

        /**
         * Encodes the specified CMD_GameNode message. Does not implicitly {@link LogonSvr.CMD_GameNode.verify|verify} messages.
         * @param message CMD_GameNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: LogonSvr.ICMD_GameNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GameNode message, length delimited. Does not implicitly {@link LogonSvr.CMD_GameNode.verify|verify} messages.
         * @param message CMD_GameNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: LogonSvr.ICMD_GameNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GameNode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GameNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): LogonSvr.CMD_GameNode;

        /**
         * Decodes a CMD_GameNode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GameNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): LogonSvr.CMD_GameNode;

        /**
         * Verifies a CMD_GameNode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GameNode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GameNode
         */
        public static fromObject(object: { [k: string]: any }): LogonSvr.CMD_GameNode;

        /**
         * Creates a plain object from a CMD_GameNode message. Also converts values to other types if specified.
         * @param message CMD_GameNode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: LogonSvr.CMD_GameNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GameNode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GamePage. */
    interface ICMD_GamePage {

        /** CMD_GamePage vlist */
        vlist?: (Proto_Struct.Itag_GamePage[] | null);
    }

    /** Represents a CMD_GamePage. */
    class CMD_GamePage implements ICMD_GamePage {

        /**
         * Constructs a new CMD_GamePage.
         * @param [properties] Properties to set
         */
        constructor(properties?: LogonSvr.ICMD_GamePage);

        /** CMD_GamePage vlist. */
        public vlist: Proto_Struct.Itag_GamePage[];

        /**
         * Creates a new CMD_GamePage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GamePage instance
         */
        public static create(properties?: LogonSvr.ICMD_GamePage): LogonSvr.CMD_GamePage;

        /**
         * Encodes the specified CMD_GamePage message. Does not implicitly {@link LogonSvr.CMD_GamePage.verify|verify} messages.
         * @param message CMD_GamePage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: LogonSvr.ICMD_GamePage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GamePage message, length delimited. Does not implicitly {@link LogonSvr.CMD_GamePage.verify|verify} messages.
         * @param message CMD_GamePage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: LogonSvr.ICMD_GamePage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GamePage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GamePage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): LogonSvr.CMD_GamePage;

        /**
         * Decodes a CMD_GamePage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GamePage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): LogonSvr.CMD_GamePage;

        /**
         * Verifies a CMD_GamePage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GamePage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GamePage
         */
        public static fromObject(object: { [k: string]: any }): LogonSvr.CMD_GamePage;

        /**
         * Creates a plain object from a CMD_GamePage message. Also converts values to other types if specified.
         * @param message CMD_GamePage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: LogonSvr.CMD_GamePage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GamePage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GameKind. */
    interface ICMD_GameKind {

        /** CMD_GameKind vlist */
        vlist?: (Proto_Struct.Itag_GameKind[] | null);
    }

    /** Represents a CMD_GameKind. */
    class CMD_GameKind implements ICMD_GameKind {

        /**
         * Constructs a new CMD_GameKind.
         * @param [properties] Properties to set
         */
        constructor(properties?: LogonSvr.ICMD_GameKind);

        /** CMD_GameKind vlist. */
        public vlist: Proto_Struct.Itag_GameKind[];

        /**
         * Creates a new CMD_GameKind instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GameKind instance
         */
        public static create(properties?: LogonSvr.ICMD_GameKind): LogonSvr.CMD_GameKind;

        /**
         * Encodes the specified CMD_GameKind message. Does not implicitly {@link LogonSvr.CMD_GameKind.verify|verify} messages.
         * @param message CMD_GameKind message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: LogonSvr.ICMD_GameKind, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GameKind message, length delimited. Does not implicitly {@link LogonSvr.CMD_GameKind.verify|verify} messages.
         * @param message CMD_GameKind message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: LogonSvr.ICMD_GameKind, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GameKind message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GameKind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): LogonSvr.CMD_GameKind;

        /**
         * Decodes a CMD_GameKind message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GameKind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): LogonSvr.CMD_GameKind;

        /**
         * Verifies a CMD_GameKind message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GameKind message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GameKind
         */
        public static fromObject(object: { [k: string]: any }): LogonSvr.CMD_GameKind;

        /**
         * Creates a plain object from a CMD_GameKind message. Also converts values to other types if specified.
         * @param message CMD_GameKind
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: LogonSvr.CMD_GameKind, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GameKind to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GameServer. */
    interface ICMD_GameServer {

        /** CMD_GameServer vlist */
        vlist?: (Proto_Struct.Itag_GameServer[] | null);
    }

    /** Represents a CMD_GameServer. */
    class CMD_GameServer implements ICMD_GameServer {

        /**
         * Constructs a new CMD_GameServer.
         * @param [properties] Properties to set
         */
        constructor(properties?: LogonSvr.ICMD_GameServer);

        /** CMD_GameServer vlist. */
        public vlist: Proto_Struct.Itag_GameServer[];

        /**
         * Creates a new CMD_GameServer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GameServer instance
         */
        public static create(properties?: LogonSvr.ICMD_GameServer): LogonSvr.CMD_GameServer;

        /**
         * Encodes the specified CMD_GameServer message. Does not implicitly {@link LogonSvr.CMD_GameServer.verify|verify} messages.
         * @param message CMD_GameServer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: LogonSvr.ICMD_GameServer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GameServer message, length delimited. Does not implicitly {@link LogonSvr.CMD_GameServer.verify|verify} messages.
         * @param message CMD_GameServer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: LogonSvr.ICMD_GameServer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GameServer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GameServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): LogonSvr.CMD_GameServer;

        /**
         * Decodes a CMD_GameServer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GameServer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): LogonSvr.CMD_GameServer;

        /**
         * Verifies a CMD_GameServer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GameServer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GameServer
         */
        public static fromObject(object: { [k: string]: any }): LogonSvr.CMD_GameServer;

        /**
         * Creates a plain object from a CMD_GameServer message. Also converts values to other types if specified.
         * @param message CMD_GameServer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: LogonSvr.CMD_GameServer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GameServer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CMD_GP_LogonFinish. */
    interface ICMD_GP_LogonFinish {

        /** < 中断时间 */
        intermittime: number;

        /** < 更新时间 */
        onlinecounttime: number;
    }

    /** Represents a CMD_GP_LogonFinish. */
    class CMD_GP_LogonFinish implements ICMD_GP_LogonFinish {

        /**
         * Constructs a new CMD_GP_LogonFinish.
         * @param [properties] Properties to set
         */
        constructor(properties?: LogonSvr.ICMD_GP_LogonFinish);

        /** < 中断时间 */
        public intermittime: number;

        /** < 更新时间 */
        public onlinecounttime: number;

        /**
         * Creates a new CMD_GP_LogonFinish instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CMD_GP_LogonFinish instance
         */
        public static create(properties?: LogonSvr.ICMD_GP_LogonFinish): LogonSvr.CMD_GP_LogonFinish;

        /**
         * Encodes the specified CMD_GP_LogonFinish message. Does not implicitly {@link LogonSvr.CMD_GP_LogonFinish.verify|verify} messages.
         * @param message CMD_GP_LogonFinish message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: LogonSvr.ICMD_GP_LogonFinish, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CMD_GP_LogonFinish message, length delimited. Does not implicitly {@link LogonSvr.CMD_GP_LogonFinish.verify|verify} messages.
         * @param message CMD_GP_LogonFinish message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: LogonSvr.ICMD_GP_LogonFinish, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CMD_GP_LogonFinish message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CMD_GP_LogonFinish
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): LogonSvr.CMD_GP_LogonFinish;

        /**
         * Decodes a CMD_GP_LogonFinish message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CMD_GP_LogonFinish
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): LogonSvr.CMD_GP_LogonFinish;

        /**
         * Verifies a CMD_GP_LogonFinish message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a CMD_GP_LogonFinish message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CMD_GP_LogonFinish
         */
        public static fromObject(object: { [k: string]: any }): LogonSvr.CMD_GP_LogonFinish;

        /**
         * Creates a plain object from a CMD_GP_LogonFinish message. Also converts values to other types if specified.
         * @param message CMD_GP_LogonFinish
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: LogonSvr.CMD_GP_LogonFinish, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CMD_GP_LogonFinish to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
