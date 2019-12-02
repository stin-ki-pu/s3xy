class ApiException(Exception):
    message = ''
    status_code = 400

    def __init__(self, status_code=400, message=''):
        super(Exception, self).__init__()
        self.message = message
        self.status_code = status_code

    def to_dict(self):
        return dict(message=self.message, status_code=self.status_code)


class ApiBadRequest(ApiException):
    def __init__(self, message=''):
        super(ApiBadRequest, self).__init__(status_code=400, message=message)


class ApiNotFound(ApiException):
    def __init__(self, message=''):
        super(ApiNotFound, self).__init__(status_code=404, message=message)


class ApiServerError(ApiException):
    def __init__(self, message=''):
        super(ApiServerError, self).__init__(status_code=500, message=message)
