/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.netpkt = (function() {

    /**
     * Namespace netpkt.
     * @exports netpkt
     * @namespace
     */
    var netpkt = {};

    netpkt.MessagePacket = (function() {

        /**
         * Properties of a MessagePacket.
         * @memberof netpkt
         * @interface IMessagePacket
         * @property {netpkt.IMessageHeader|null} [header] MessagePacket header
         * @property {Uint8Array|null} [payload] MessagePacket payload
         */

        /**
         * Constructs a new MessagePacket.
         * @memberof netpkt
         * @classdesc Represents a MessagePacket.
         * @implements IMessagePacket
         * @constructor
         * @param {netpkt.IMessagePacket=} [properties] Properties to set
         */
        function MessagePacket(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessagePacket header.
         * @member {netpkt.IMessageHeader|null|undefined} header
         * @memberof netpkt.MessagePacket
         * @instance
         */
        MessagePacket.prototype.header = null;

        /**
         * MessagePacket payload.
         * @member {Uint8Array} payload
         * @memberof netpkt.MessagePacket
         * @instance
         */
        MessagePacket.prototype.payload = $util.newBuffer([]);

        /**
         * Creates a new MessagePacket instance using the specified properties.
         * @function create
         * @memberof netpkt.MessagePacket
         * @static
         * @param {netpkt.IMessagePacket=} [properties] Properties to set
         * @returns {netpkt.MessagePacket} MessagePacket instance
         */
        MessagePacket.create = function create(properties) {
            return new MessagePacket(properties);
        };

        /**
         * Encodes the specified MessagePacket message. Does not implicitly {@link netpkt.MessagePacket.verify|verify} messages.
         * @function encode
         * @memberof netpkt.MessagePacket
         * @static
         * @param {netpkt.IMessagePacket} message MessagePacket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessagePacket.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.header != null && Object.hasOwnProperty.call(message, "header"))
                $root.netpkt.MessageHeader.encode(message.header, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.payload != null && Object.hasOwnProperty.call(message, "payload"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.payload);
            return writer;
        };

        /**
         * Encodes the specified MessagePacket message, length delimited. Does not implicitly {@link netpkt.MessagePacket.verify|verify} messages.
         * @function encodeDelimited
         * @memberof netpkt.MessagePacket
         * @static
         * @param {netpkt.IMessagePacket} message MessagePacket message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessagePacket.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessagePacket message from the specified reader or buffer.
         * @function decode
         * @memberof netpkt.MessagePacket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {netpkt.MessagePacket} MessagePacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessagePacket.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.netpkt.MessagePacket();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.header = $root.netpkt.MessageHeader.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.payload = reader.bytes();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessagePacket message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof netpkt.MessagePacket
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {netpkt.MessagePacket} MessagePacket
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessagePacket.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessagePacket message.
         * @function verify
         * @memberof netpkt.MessagePacket
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessagePacket.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.header != null && message.hasOwnProperty("header")) {
                var error = $root.netpkt.MessageHeader.verify(message.header);
                if (error)
                    return "header." + error;
            }
            if (message.payload != null && message.hasOwnProperty("payload"))
                if (!(message.payload && typeof message.payload.length === "number" || $util.isString(message.payload)))
                    return "payload: buffer expected";
            return null;
        };

        /**
         * Creates a MessagePacket message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof netpkt.MessagePacket
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {netpkt.MessagePacket} MessagePacket
         */
        MessagePacket.fromObject = function fromObject(object) {
            if (object instanceof $root.netpkt.MessagePacket)
                return object;
            var message = new $root.netpkt.MessagePacket();
            if (object.header != null) {
                if (typeof object.header !== "object")
                    throw TypeError(".netpkt.MessagePacket.header: object expected");
                message.header = $root.netpkt.MessageHeader.fromObject(object.header);
            }
            if (object.payload != null)
                if (typeof object.payload === "string")
                    $util.base64.decode(object.payload, message.payload = $util.newBuffer($util.base64.length(object.payload)), 0);
                else if (object.payload.length >= 0)
                    message.payload = object.payload;
            return message;
        };

        /**
         * Creates a plain object from a MessagePacket message. Also converts values to other types if specified.
         * @function toObject
         * @memberof netpkt.MessagePacket
         * @static
         * @param {netpkt.MessagePacket} message MessagePacket
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessagePacket.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.header = null;
                if (options.bytes === String)
                    object.payload = "";
                else {
                    object.payload = [];
                    if (options.bytes !== Array)
                        object.payload = $util.newBuffer(object.payload);
                }
            }
            if (message.header != null && message.hasOwnProperty("header"))
                object.header = $root.netpkt.MessageHeader.toObject(message.header, options);
            if (message.payload != null && message.hasOwnProperty("payload"))
                object.payload = options.bytes === String ? $util.base64.encode(message.payload, 0, message.payload.length) : options.bytes === Array ? Array.prototype.slice.call(message.payload) : message.payload;
            return object;
        };

        /**
         * Converts this MessagePacket to JSON.
         * @function toJSON
         * @memberof netpkt.MessagePacket
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessagePacket.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessagePacket
         * @function getTypeUrl
         * @memberof netpkt.MessagePacket
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessagePacket.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/netpkt.MessagePacket";
        };

        return MessagePacket;
    })();

    netpkt.MessageHeader = (function() {

        /**
         * Properties of a MessageHeader.
         * @memberof netpkt
         * @interface IMessageHeader
         * @property {number|null} [version] MessageHeader version
         * @property {number|null} [mainId] MessageHeader mainId
         * @property {number|null} [subId] MessageHeader subId
         * @property {number|Long|null} [requestId] MessageHeader requestId
         * @property {number|null} [bodyLen] MessageHeader bodyLen
         * @property {netpkt.MessageHeader.Codec|null} [codecType] MessageHeader codecType
         * @property {number|null} [reserved] MessageHeader reserved
         */

        /**
         * Constructs a new MessageHeader.
         * @memberof netpkt
         * @classdesc Represents a MessageHeader.
         * @implements IMessageHeader
         * @constructor
         * @param {netpkt.IMessageHeader=} [properties] Properties to set
         */
        function MessageHeader(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageHeader version.
         * @member {number} version
         * @memberof netpkt.MessageHeader
         * @instance
         */
        MessageHeader.prototype.version = 0;

        /**
         * MessageHeader mainId.
         * @member {number} mainId
         * @memberof netpkt.MessageHeader
         * @instance
         */
        MessageHeader.prototype.mainId = 0;

        /**
         * MessageHeader subId.
         * @member {number} subId
         * @memberof netpkt.MessageHeader
         * @instance
         */
        MessageHeader.prototype.subId = 0;

        /**
         * MessageHeader requestId.
         * @member {number|Long} requestId
         * @memberof netpkt.MessageHeader
         * @instance
         */
        MessageHeader.prototype.requestId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * MessageHeader bodyLen.
         * @member {number} bodyLen
         * @memberof netpkt.MessageHeader
         * @instance
         */
        MessageHeader.prototype.bodyLen = 0;

        /**
         * MessageHeader codecType.
         * @member {netpkt.MessageHeader.Codec} codecType
         * @memberof netpkt.MessageHeader
         * @instance
         */
        MessageHeader.prototype.codecType = 0;

        /**
         * MessageHeader reserved.
         * @member {number} reserved
         * @memberof netpkt.MessageHeader
         * @instance
         */
        MessageHeader.prototype.reserved = 0;

        /**
         * Creates a new MessageHeader instance using the specified properties.
         * @function create
         * @memberof netpkt.MessageHeader
         * @static
         * @param {netpkt.IMessageHeader=} [properties] Properties to set
         * @returns {netpkt.MessageHeader} MessageHeader instance
         */
        MessageHeader.create = function create(properties) {
            return new MessageHeader(properties);
        };

        /**
         * Encodes the specified MessageHeader message. Does not implicitly {@link netpkt.MessageHeader.verify|verify} messages.
         * @function encode
         * @memberof netpkt.MessageHeader
         * @static
         * @param {netpkt.IMessageHeader} message MessageHeader message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageHeader.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.version);
            if (message.mainId != null && Object.hasOwnProperty.call(message, "mainId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.mainId);
            if (message.subId != null && Object.hasOwnProperty.call(message, "subId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.subId);
            if (message.requestId != null && Object.hasOwnProperty.call(message, "requestId"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.requestId);
            if (message.bodyLen != null && Object.hasOwnProperty.call(message, "bodyLen"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.bodyLen);
            if (message.codecType != null && Object.hasOwnProperty.call(message, "codecType"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.codecType);
            if (message.reserved != null && Object.hasOwnProperty.call(message, "reserved"))
                writer.uint32(/* id 15, wireType 0 =*/120).uint32(message.reserved);
            return writer;
        };

        /**
         * Encodes the specified MessageHeader message, length delimited. Does not implicitly {@link netpkt.MessageHeader.verify|verify} messages.
         * @function encodeDelimited
         * @memberof netpkt.MessageHeader
         * @static
         * @param {netpkt.IMessageHeader} message MessageHeader message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageHeader.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageHeader message from the specified reader or buffer.
         * @function decode
         * @memberof netpkt.MessageHeader
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {netpkt.MessageHeader} MessageHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageHeader.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.netpkt.MessageHeader();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.version = reader.uint32();
                        break;
                    }
                case 2: {
                        message.mainId = reader.uint32();
                        break;
                    }
                case 3: {
                        message.subId = reader.uint32();
                        break;
                    }
                case 4: {
                        message.requestId = reader.uint64();
                        break;
                    }
                case 5: {
                        message.bodyLen = reader.uint32();
                        break;
                    }
                case 6: {
                        message.codecType = reader.int32();
                        break;
                    }
                case 15: {
                        message.reserved = reader.uint32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageHeader message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof netpkt.MessageHeader
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {netpkt.MessageHeader} MessageHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageHeader.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageHeader message.
         * @function verify
         * @memberof netpkt.MessageHeader
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageHeader.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isInteger(message.version))
                    return "version: integer expected";
            if (message.mainId != null && message.hasOwnProperty("mainId"))
                if (!$util.isInteger(message.mainId))
                    return "mainId: integer expected";
            if (message.subId != null && message.hasOwnProperty("subId"))
                if (!$util.isInteger(message.subId))
                    return "subId: integer expected";
            if (message.requestId != null && message.hasOwnProperty("requestId"))
                if (!$util.isInteger(message.requestId) && !(message.requestId && $util.isInteger(message.requestId.low) && $util.isInteger(message.requestId.high)))
                    return "requestId: integer|Long expected";
            if (message.bodyLen != null && message.hasOwnProperty("bodyLen"))
                if (!$util.isInteger(message.bodyLen))
                    return "bodyLen: integer expected";
            if (message.codecType != null && message.hasOwnProperty("codecType"))
                switch (message.codecType) {
                default:
                    return "codecType: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    break;
                }
            if (message.reserved != null && message.hasOwnProperty("reserved"))
                if (!$util.isInteger(message.reserved))
                    return "reserved: integer expected";
            return null;
        };

        /**
         * Creates a MessageHeader message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof netpkt.MessageHeader
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {netpkt.MessageHeader} MessageHeader
         */
        MessageHeader.fromObject = function fromObject(object) {
            if (object instanceof $root.netpkt.MessageHeader)
                return object;
            var message = new $root.netpkt.MessageHeader();
            if (object.version != null)
                message.version = object.version >>> 0;
            if (object.mainId != null)
                message.mainId = object.mainId >>> 0;
            if (object.subId != null)
                message.subId = object.subId >>> 0;
            if (object.requestId != null)
                if ($util.Long)
                    (message.requestId = $util.Long.fromValue(object.requestId)).unsigned = true;
                else if (typeof object.requestId === "string")
                    message.requestId = parseInt(object.requestId, 10);
                else if (typeof object.requestId === "number")
                    message.requestId = object.requestId;
                else if (typeof object.requestId === "object")
                    message.requestId = new $util.LongBits(object.requestId.low >>> 0, object.requestId.high >>> 0).toNumber(true);
            if (object.bodyLen != null)
                message.bodyLen = object.bodyLen >>> 0;
            switch (object.codecType) {
            default:
                if (typeof object.codecType === "number") {
                    message.codecType = object.codecType;
                    break;
                }
                break;
            case "NONE":
            case 0:
                message.codecType = 0;
                break;
            case "AES":
            case 1:
                message.codecType = 1;
                break;
            case "RSA":
            case 2:
                message.codecType = 2;
                break;
            case "GZIP":
            case 3:
                message.codecType = 3;
                break;
            case "ZLIB":
            case 4:
                message.codecType = 4;
                break;
            }
            if (object.reserved != null)
                message.reserved = object.reserved >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a MessageHeader message. Also converts values to other types if specified.
         * @function toObject
         * @memberof netpkt.MessageHeader
         * @static
         * @param {netpkt.MessageHeader} message MessageHeader
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageHeader.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.version = 0;
                object.mainId = 0;
                object.subId = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.requestId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.requestId = options.longs === String ? "0" : 0;
                object.bodyLen = 0;
                object.codecType = options.enums === String ? "NONE" : 0;
                object.reserved = 0;
            }
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.mainId != null && message.hasOwnProperty("mainId"))
                object.mainId = message.mainId;
            if (message.subId != null && message.hasOwnProperty("subId"))
                object.subId = message.subId;
            if (message.requestId != null && message.hasOwnProperty("requestId"))
                if (typeof message.requestId === "number")
                    object.requestId = options.longs === String ? String(message.requestId) : message.requestId;
                else
                    object.requestId = options.longs === String ? $util.Long.prototype.toString.call(message.requestId) : options.longs === Number ? new $util.LongBits(message.requestId.low >>> 0, message.requestId.high >>> 0).toNumber(true) : message.requestId;
            if (message.bodyLen != null && message.hasOwnProperty("bodyLen"))
                object.bodyLen = message.bodyLen;
            if (message.codecType != null && message.hasOwnProperty("codecType"))
                object.codecType = options.enums === String ? $root.netpkt.MessageHeader.Codec[message.codecType] === undefined ? message.codecType : $root.netpkt.MessageHeader.Codec[message.codecType] : message.codecType;
            if (message.reserved != null && message.hasOwnProperty("reserved"))
                object.reserved = message.reserved;
            return object;
        };

        /**
         * Converts this MessageHeader to JSON.
         * @function toJSON
         * @memberof netpkt.MessageHeader
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageHeader.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for MessageHeader
         * @function getTypeUrl
         * @memberof netpkt.MessageHeader
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        MessageHeader.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/netpkt.MessageHeader";
        };

        /**
         * Codec enum.
         * @name netpkt.MessageHeader.Codec
         * @enum {number}
         * @property {number} NONE=0 NONE value
         * @property {number} AES=1 AES value
         * @property {number} RSA=2 RSA value
         * @property {number} GZIP=3 GZIP value
         * @property {number} ZLIB=4 ZLIB value
         */
        MessageHeader.Codec = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "NONE"] = 0;
            values[valuesById[1] = "AES"] = 1;
            values[valuesById[2] = "RSA"] = 2;
            values[valuesById[3] = "GZIP"] = 3;
            values[valuesById[4] = "ZLIB"] = 4;
            return values;
        })();

        return MessageHeader;
    })();

    /**
     * HeartbeatCmd enum.
     * @name netpkt.HeartbeatCmd
     * @enum {number}
     * @property {number} KN_NONE=0 KN_NONE value
     * @property {number} KN_MAIN_ID=10000 KN_MAIN_ID value
     * @property {number} KN_DETECT=10001 KN_DETECT value
     */
    netpkt.HeartbeatCmd = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "KN_NONE"] = 0;
        values[valuesById[10000] = "KN_MAIN_ID"] = 10000;
        values[valuesById[10001] = "KN_DETECT"] = 10001;
        return values;
    })();

    netpkt.Heartbeat = (function() {

        /**
         * Properties of a Heartbeat.
         * @memberof netpkt
         * @interface IHeartbeat
         * @property {number|Long|null} [timestamp] Heartbeat timestamp
         */

        /**
         * Constructs a new Heartbeat.
         * @memberof netpkt
         * @classdesc Represents a Heartbeat.
         * @implements IHeartbeat
         * @constructor
         * @param {netpkt.IHeartbeat=} [properties] Properties to set
         */
        function Heartbeat(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Heartbeat timestamp.
         * @member {number|Long} timestamp
         * @memberof netpkt.Heartbeat
         * @instance
         */
        Heartbeat.prototype.timestamp = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * Creates a new Heartbeat instance using the specified properties.
         * @function create
         * @memberof netpkt.Heartbeat
         * @static
         * @param {netpkt.IHeartbeat=} [properties] Properties to set
         * @returns {netpkt.Heartbeat} Heartbeat instance
         */
        Heartbeat.create = function create(properties) {
            return new Heartbeat(properties);
        };

        /**
         * Encodes the specified Heartbeat message. Does not implicitly {@link netpkt.Heartbeat.verify|verify} messages.
         * @function encode
         * @memberof netpkt.Heartbeat
         * @static
         * @param {netpkt.IHeartbeat} message Heartbeat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Heartbeat.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.timestamp);
            return writer;
        };

        /**
         * Encodes the specified Heartbeat message, length delimited. Does not implicitly {@link netpkt.Heartbeat.verify|verify} messages.
         * @function encodeDelimited
         * @memberof netpkt.Heartbeat
         * @static
         * @param {netpkt.IHeartbeat} message Heartbeat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Heartbeat.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Heartbeat message from the specified reader or buffer.
         * @function decode
         * @memberof netpkt.Heartbeat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {netpkt.Heartbeat} Heartbeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Heartbeat.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.netpkt.Heartbeat();
            while (reader.pos < end) {
                var tag = reader.uint32();
                if (tag === error)
                    break;
                switch (tag >>> 3) {
                case 1: {
                        message.timestamp = reader.uint64();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Heartbeat message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof netpkt.Heartbeat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {netpkt.Heartbeat} Heartbeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Heartbeat.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Heartbeat message.
         * @function verify
         * @memberof netpkt.Heartbeat
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Heartbeat.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            return null;
        };

        /**
         * Creates a Heartbeat message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof netpkt.Heartbeat
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {netpkt.Heartbeat} Heartbeat
         */
        Heartbeat.fromObject = function fromObject(object) {
            if (object instanceof $root.netpkt.Heartbeat)
                return object;
            var message = new $root.netpkt.Heartbeat();
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = true;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a Heartbeat message. Also converts values to other types if specified.
         * @function toObject
         * @memberof netpkt.Heartbeat
         * @static
         * @param {netpkt.Heartbeat} message Heartbeat
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Heartbeat.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber(true) : message.timestamp;
            return object;
        };

        /**
         * Converts this Heartbeat to JSON.
         * @function toJSON
         * @memberof netpkt.Heartbeat
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Heartbeat.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Heartbeat
         * @function getTypeUrl
         * @memberof netpkt.Heartbeat
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Heartbeat.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/netpkt.Heartbeat";
        };

        return Heartbeat;
    })();

    return netpkt;
})();

module.exports = $root;
