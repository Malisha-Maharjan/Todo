import logging

import jwt
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response

from Todo.settings import SIMPLE_JWT

logger = logging.getLogger(__name__)

def verify_token(request):
  try: 
    token = request.headers.get('Authorization').split()
    payload = jwt.decode(
      token[1],
      SIMPLE_JWT['SIGNING_KEY'],
      algorithms=[SIMPLE_JWT['ALGORITHM']]
    )
    logger.warning(payload)
    return True
  except Exception as e:
    return False