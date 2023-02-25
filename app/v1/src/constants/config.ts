export const DEFAULT_JWT_SECRET_KEY = "oıtuewıogjsdıogjewıgjsdıfjerwogjdsıog4u386974987238957329853uytıjosdkfewf";
export const DEFAULT_PORT = 4000;

export const ENV = {
  PORT: process.env.PORT || DEFAULT_PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || DEFAULT_JWT_SECRET_KEY
};

export const responseMessages = {
  required: "Lütfen boş alan bırakmayınız!",
  unauthorized: "Tanımsız giriş!",
  wrongCredential: "Email/Telefon numarası yanlış, lütfen tekrar deneyin!",
  isAlreadyProductInFavorite: "Bu ürün zaten favorilerinizde!",
  missingInformationSent: "Eksik bilgi gönderildi!",
  thisProductIsNotOnYourCart: "Bu ürün kartınızda mevcut değil!",
  orderNotAvailableForWriteComment: "Bu ürüne yorum yazmak için önce sipariş vermelisiniz!",
  firstTimeNotAvailableForWriteComment: "Sipariş verdiğiniz, sadece bir ürüne yorum yapabilirsiniz!"
}