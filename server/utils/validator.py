from jsonschema import validate, FormatChecker, ValidationError

from utils.exceptions import ApiBadRequest


def json_schema_validator(data, schema):
    """
    Validate a json according to a given schema.
    :raises Exception: Validation exception.
    :param json: The json to validate
    :param schema: The json schema https://json-schema.org/
    """
    try:
        validate(data, schema, format_checker=FormatChecker())
    except ValidationError as e:
        raise ApiBadRequest(e.message)
