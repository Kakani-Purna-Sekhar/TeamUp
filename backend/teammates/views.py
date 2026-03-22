from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Teammate
from .serializers import TeammateSerializer


class RegisterView(APIView):
    def post(self, request):
        serializer = TeammateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListView(generics.ListAPIView):
    queryset = Teammate.objects.all().order_by('-created_at')
    serializer_class = TeammateSerializer


class SearchView(generics.ListAPIView):
    serializer_class = TeammateSerializer

    def get_queryset(self):
        qs = Teammate.objects.all().order_by('-created_at')
        skill = self.request.query_params.get('skill', '').strip()
        if skill:
            qs = qs.filter(skills__icontains=skill)
        return qs
