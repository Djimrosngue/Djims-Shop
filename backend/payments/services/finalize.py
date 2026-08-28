from django.db import transaction

from cart.models import Cart
from payments.models import Payment


@transaction.atomic
def finalize_payment(payment):

    if payment.status != "success":
        return False

    order = payment.order

    # Éviter de traiter deux fois le même paiement
    if order.payment_status == "paid":
        return True

    # Vérification du stock
    for item in order.items.select_related("product"):

        if item.product is None:
            raise ValueError(
                f"Le produit de la commande "
                f"{item.product_name} n'existe plus."
            )

        if item.product.stock < item.quantity:
            raise ValueError(
                f"Stock insuffisant pour "
                f"{item.product_name}."
            )

    # Décrémentation du stock
    for item in order.items.select_related("product"):

        item.product.stock -= item.quantity
        item.product.save(
            update_fields=["stock"]
        )

    # Mise à jour commande
    order.payment_status = "paid"
    order.status = "confirmed"
    order.save(
        update_fields=[
            "payment_status",
            "status",
            "updated_at",
        ]
    )

    # Suppression du panier
    Cart.objects.filter(
        user=order.user
    ).delete()

    return True