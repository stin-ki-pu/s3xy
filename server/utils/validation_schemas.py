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

schemas['create_bucket'] = {
    "type": "object",
    "properties": {
        "bucket_name": {
            "type": "string"
        }
    },
    'required': ['bucket_name'],
    "additionalProperties": False
}
