export interface WXQMessage {
    // ....
    
}
declare module 'vue/types/vue'{
    interface Vue{
        $message: WXQMessage
    }
}
