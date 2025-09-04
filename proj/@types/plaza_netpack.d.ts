// import * as $protobuf from "protobufjs";
// import Long = require("long");
/** Namespace netpkt. */
declare namespace netpkt {

    /** Properties of a MessagePacket. */
    interface IMessagePacket {

        /** MessagePacket header */
        header?: (netpkt.IMessageHeader | null);

        /** MessagePacket payload */
        payload?: (Uint8Array | null);
    }

    /** Represents a MessagePacket. */
    class MessagePacket implements IMessagePacket {

        /**
         * Constructs a new MessagePacket.
         * @param [properties] Properties to set
         */
        constructor(properties?: netpkt.IMessagePacket);

        /** MessagePacket header. */
        public header?: (netpkt.IMessageHeader | null);

        /** MessagePacket payload. */
        public payload: Uint8Array;

        /**
         * Creates a new MessagePacket instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MessagePacket instance
         */
        public static create(properties?: netpkt.IMessagePacket): netpkt.MessagePacket;

        /**
         * Encodes the specified MessagePacket message. Does not implicitly {@link netpkt.MessagePacket.verify|verify} messages.
         * @param message MessagePacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: netpkt.IMessagePacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MessagePacket message, length delimited. Does not implicitly {@link netpkt.MessagePacket.verify|verify} messages.
         * @param message MessagePacket message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: netpkt.IMessagePacket, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MessagePacket message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MessagePacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): netpkt.MessagePacket;

        /**
         * Decodes a MessagePacket message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MessagePacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): netpkt.MessagePacket;

        /**
         * Verifies a MessagePacket message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a MessagePacket message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MessagePacket
         */
        public static fromObject(object: { [k: string]: any }): netpkt.MessagePacket;

        /**
         * Creates a plain object from a MessagePacket message. Also converts values to other types if specified.
         * @param message MessagePacket
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: netpkt.MessagePacket, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MessagePacket to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MessagePacket
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a MessageHeader. */
    interface IMessageHeader {

        /** MessageHeader version */
        version?: (number | null);

        /** MessageHeader main_id */
        main_id?: (number | null);

        /** MessageHeader sub_id */
        sub_id?: (number | null);

        /** MessageHeader request_id */
        request_id?: (number | Long | null);

        /** MessageHeader body_len */
        body_len?: (number | null);

        /** MessageHeader codec_type */
        codec_type?: (netpkt.MessageHeader.Codec | null);

        /** MessageHeader reserved */
        reserved?: (number | null);
    }

    /** Represents a MessageHeader. */
    class MessageHeader implements IMessageHeader {

        /**
         * Constructs a new MessageHeader.
         * @param [properties] Properties to set
         */
        constructor(properties?: netpkt.IMessageHeader);

        /** MessageHeader version. */
        public version: number;

        /** MessageHeader main_id. */
        public main_id: number;

        /** MessageHeader sub_id. */
        public sub_id: number;

        /** MessageHeader request_id. */
        public request_id: (number | Long);

        /** MessageHeader body_len. */
        public body_len: number;

        /** MessageHeader codec_type. */
        public codec_type: netpkt.MessageHeader.Codec;

        /** MessageHeader reserved. */
        public reserved: number;

        /**
         * Creates a new MessageHeader instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MessageHeader instance
         */
        public static create(properties?: netpkt.IMessageHeader): netpkt.MessageHeader;

        /**
         * Encodes the specified MessageHeader message. Does not implicitly {@link netpkt.MessageHeader.verify|verify} messages.
         * @param message MessageHeader message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: netpkt.IMessageHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MessageHeader message, length delimited. Does not implicitly {@link netpkt.MessageHeader.verify|verify} messages.
         * @param message MessageHeader message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: netpkt.IMessageHeader, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MessageHeader message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MessageHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): netpkt.MessageHeader;

        /**
         * Decodes a MessageHeader message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MessageHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): netpkt.MessageHeader;

        /**
         * Verifies a MessageHeader message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a MessageHeader message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MessageHeader
         */
        public static fromObject(object: { [k: string]: any }): netpkt.MessageHeader;

        /**
         * Creates a plain object from a MessageHeader message. Also converts values to other types if specified.
         * @param message MessageHeader
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: netpkt.MessageHeader, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MessageHeader to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for MessageHeader
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace MessageHeader {

        /** Codec enum. */
        enum Codec {
            NONE = 0,
            AES = 1,
            RSA = 2,
            GZIP = 3,
            ZLIB = 4
        }
    }

    /** HeartbeatCmd enum. */
    enum HeartbeatCmd {
        KN_NONE = 0,
        KN_MAIN_ID = 10000,
        KN_DETECT = 10001
    }

    /** Properties of a Heartbeat. */
    interface IHeartbeat {

        /** Heartbeat timestamp */
        timestamp?: (number | Long | null);
    }

    /** Represents a Heartbeat. */
    class Heartbeat implements IHeartbeat {

        /**
         * Constructs a new Heartbeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: netpkt.IHeartbeat);

        /** Heartbeat timestamp. */
        public timestamp: (number | Long);

        /**
         * Creates a new Heartbeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Heartbeat instance
         */
        public static create(properties?: netpkt.IHeartbeat): netpkt.Heartbeat;

        /**
         * Encodes the specified Heartbeat message. Does not implicitly {@link netpkt.Heartbeat.verify|verify} messages.
         * @param message Heartbeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: netpkt.IHeartbeat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Heartbeat message, length delimited. Does not implicitly {@link netpkt.Heartbeat.verify|verify} messages.
         * @param message Heartbeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: netpkt.IHeartbeat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Heartbeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Heartbeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader | Uint8Array), length?: number): netpkt.Heartbeat;

        /**
         * Decodes a Heartbeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Heartbeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader | Uint8Array)): netpkt.Heartbeat;

        /**
         * Verifies a Heartbeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string | null);

        /**
         * Creates a Heartbeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Heartbeat
         */
        public static fromObject(object: { [k: string]: any }): netpkt.Heartbeat;

        /**
         * Creates a plain object from a Heartbeat message. Also converts values to other types if specified.
         * @param message Heartbeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: netpkt.Heartbeat, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Heartbeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Heartbeat
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
