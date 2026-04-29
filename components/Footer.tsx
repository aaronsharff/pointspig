export function Footer() {
  return (
    <footer className="mt-24 border-t border-pig-200 bg-pig-50/60">
      <div className="max-w-4xl mx-auto px-6 py-10 text-sm text-plum/60 space-y-3">
        <p className="font-semibold text-plum">PointsPig, Inc.</p>
        <p>
          PointsPig facilitates voluntary financial transactions for the express purpose of
          generating credit card rewards. Points and rewards are issued by your card issuer
          under the terms of your cardholder agreement; PointsPig does not issue points and
          makes no representations regarding the rewards you may earn. All charges are final
          and non-refundable. By initiating a transaction you acknowledge that no goods,
          services, or other consideration are provided in exchange for payment.
        </p>
        <p>&copy; {new Date().getFullYear()} PointsPig, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}
