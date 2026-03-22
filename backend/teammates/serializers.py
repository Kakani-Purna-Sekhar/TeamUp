from rest_framework import serializers

from .models import Teammate


class TeammateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teammate
        fields = ['id', 'name', 'college', 'skills', 'looking_for', 'created_at']
        read_only_fields = ['id', 'created_at']
