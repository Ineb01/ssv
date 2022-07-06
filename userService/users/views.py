from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from users.serializers import UserSerializer


class IsPostRequest(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.method == "POST"

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [IsPostRequest|permissions.IsAuthenticated]

class UserViewSetIntern(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer