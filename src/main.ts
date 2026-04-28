import Aura from '@primeuix/themes/aura';
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from 'primevue/toastservice';
import { createApp } from "vue";
import "./style.css";
//
import 'github-markdown-css/github-markdown.css';
// @ts-ignore
import App from "./App.vue";

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: "p",
            darkModeSelector: ".p-dark",
            cssLayer: {
                name: 'primevue',
                order: 'theme, base, primevue, utilities'
            },
        },
    },
    pt: {
        toast: {
            messageContent: { class: 'items-center' },
            messageText: { class: 'block' },
            buttonContainer: { class: 'flex items-center' },
            closeButton: { class: 'm-0 right-0' }

            // class: 'p-toast-message-content', style: `{
            //     display: flex;
            //     align-items: flex- start;
            //     padding: var(--p-toast-content-padding);
            //     gap: var(--p-toast-content-gap);
            //     min-height: 0;
            //     overflow: hidden;
            //     // transition: padding 250ms ease-in;
            // }`
        },
    }
});
app.use(ToastService);

app.mount("#app");