schemas = dict()

schemas["login"] = {
    "type": "object",
    "properties": {
        "access-key": {
            "type": "string"
        }, "secret-key": {
            "type": "string"
        }
    },
    'required': ['access-key', 'secret-key'],
    "additionalProperties": False
}
