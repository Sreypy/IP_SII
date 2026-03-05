import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
const store = createPinia();
const app = createApp(App);
app.use(store);

app.mount("#app");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3100);
}
bootstrap();
