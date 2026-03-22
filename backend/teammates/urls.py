from django.urls import path

from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='api-register'),
    path('users/', views.UserListView.as_view(), name='api-users'),
    path('search/', views.SearchView.as_view(), name='api-search'),
]
