Merhaba MAYZOR BACKEND TEST CASE'e Hoşgeldiniz.

POSTMAN API Documentation:
https://www.postman.com/vigilante1/workspace/34d8cf6f-835e-498c-acbd-45a4d72c3dd4/api/f190a8cf-8285-4d34-88e1-7917ab458803

- Projeyi başarılı bir şekilde başlatabilmeniz için yapılması gerekenler:

1- Ana dizinde ".env" isimli bir dosya oluşturun.

- DATABASE_URL="file:./prod.db" bu komut satırı database modelimizin nereye derleneceğini belirtmektedir.
- APPV1_PORT=4000 sunucumuzun çalışacağı port yazılmaktadır. Bu belirtilmez ise app/v1/src/constants/config.ts isimli dosya üzerinde
  varsayılan olarak tanımlanmıştır.
  2- Komut satırına proje dizininde yapılması gerekenler:
- npm install (proje bağımlılıklarının yüklenmesi)
- npm run prisma:migrate (kullandığımız https://prisma.io/ bir orm kütüphanesidir. bu komut satırı sayesinde şemamızı typescript tarafında typeların derlenmesi ve database modelimizin oluşturulmasında kullanılmaktadır.)
- npm run app:seed (bu komut satırı sayesinde varsayılan olarak kullanıcı ve ürün girişlerini otomatik olarak yapabilirsiniz)

Tebrikler artık hazırsınız.

- npm run start:dev

NOT: Database olarak, bir dosya tarafından yönetilmesi ve kolayca çalıştırılıp test edilmesi amacıyla SQLite kullanmış bulunmaktayım.
Detaylı olarak diğer database ler ile çalışmak isteme durumunda şuraya göz atabilirsiniz:
https://www.prisma.io/docs/concepts/database-connectors
