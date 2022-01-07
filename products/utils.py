import random
import string
from django.utils.text import slugify


def random_string_generator(size=10, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def slugify_instance_title(instance, save=False, new_slug=None):
    if new_slug is not None:
        slug = new_slug
    else:
        slug = slugify(instance.title)
    Klass = instance.__class__
    qs = Klass.objects.filter(slug=slug).exclude(id=instance.id)
    if qs.exists():
        # auto generate new slug
        new_slug = "{slug}-{randstr}".format(
            slug=slug, randstr=random_string_generator(size=4))
        return slugify_instance_title(instance, save=save, new_slug=new_slug)
    instance.slug = slug
    if save:
        instance.save()
    return instance


def create_alt_text(instance, save=False):
    alt_text = slugify(instance.image.name)
    instance.alt_text = alt_text

    if save:
        instance.save()
    return instance
