from django.urls import path
from . import views

urlpatterns = [
    path("health/", views.NoteListCreate.as_view(), name="health-list"),
    path("health/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-health"),
]
