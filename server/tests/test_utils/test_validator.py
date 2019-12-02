import pytest
from jsonschema import ValidationError

from server.utils.validator import json_schema_validator
from utils.exceptions import ApiBadRequest


class TestJsonSchemaValidator:
    schema = {
        'type': 'object',
        'properties': {
            "required": {
                'type': 'string',
            },
            "optional": {
                'type': 'string',
            },
            "number": {
                'type': 'number',
            }
        },
        'required': ['required'],
        "additionalProperties": False
    }

    def test_valid_json(self):
        json_schema_validator(json=dict(required="Hue", optional="optional", number=69), schema=self.schema)

    def test_invalid_json(self):
        with pytest.raises(ApiBadRequest):
            json_schema_validator(json=dict(required="Hue",
                                            optional="optional",
                                            number="Definitely not a number"),
                                  schema=self.schema)

    def test_empty_json(self):
        with pytest.raises(ApiBadRequest):
            json_schema_validator(json=dict(),
                                  schema=self.schema)

