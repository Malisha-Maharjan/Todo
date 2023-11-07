import logging

import jwt
from Todo.settings import SIMPLE_JWT

logger = logging.getLogger(__name__)


def verify_token(request):
    """verify jwt token """
    try:
        token = request.headers.get('Authorization').split()
        payload = jwt.decode(
            token[1],
            SIMPLE_JWT['SIGNING_KEY'],
            algorithms=[SIMPLE_JWT['ALGORITHM']]
        )
        return payload['username']
    except Exception as e:
        return False
