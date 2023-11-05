import logging

from rest_framework_simplejwt.tokens import AccessToken

logger = logging.getLogger(__name__)


def generateToken(user) :
  logger.warning("generationg")
  token = AccessToken.for_user(user)
  token['username'] = user.username
  logger.warning("hi")
  return str(token)