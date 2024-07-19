from django.contrib import admin
from django.urls import path
from recipes import views
from rest_framework.urlpatterns import format_suffix_patterns

# from .views import recipe_filter

urlpatterns = [
    path("", views.recipe_list),
    path('admin/', admin.site.urls),
    path('recipes/', views.recipe_list),
    path('recipes/<int:id>', views.recipe_detail),
    path('recipes/filter/', views.recipe_filter)
]

urlpatterns = format_suffix_patterns(urlpatterns)