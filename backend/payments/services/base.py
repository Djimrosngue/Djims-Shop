from abc import ABC, abstractmethod


class PaymentService(ABC):

    @abstractmethod
    def initiate_payment(
        self,
        payment
    ):
        pass

    @abstractmethod
    def check_payment(
        self,
        payment
    ):
        pass