import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBasketStore = defineStore('basket', () => {
    const baskets = ref({});

    function addItem(cardGroupName, item, ObjNames) {
        if (!baskets.value[cardGroupName]) {
            baskets.value[cardGroupName] = [];
        }

        let existingItem = baskets.value[cardGroupName].find(i => i.id === item[ObjNames.id]);
        if (existingItem) {
            if (existingItem.quantity < existingItem.limit) {
                existingItem.quantity += 1;
            }
        } else {
            baskets.value[cardGroupName].push({ id: item[ObjNames.id], quantity: 1, limit: item[ObjNames.envanter], unitPrice: item[ObjNames.price], item: item });
        }
    }

    function removeItem(cardGroupName, itemId) {
        if (baskets.value[cardGroupName]) {
            baskets.value[cardGroupName] = baskets.value[cardGroupName].filter(i => i.id !== itemId);
        }
    }

    function clearBasket(cardGroupName) {
        if (baskets.value[cardGroupName]) {
            baskets.value[cardGroupName] = [];
        }
    }

    function getBasket(cardGroupName) {
        return baskets.value[cardGroupName] || [];
    }

    function increaseQuantity(cardGroupName, itemId) {
        let item = baskets.value[cardGroupName]?.find(i => i.id === itemId);
        if (item && item.quantity < item.limit) {
            item.quantity += 1;
        }
    }

    function decreaseQuantity(cardGroupName, itemId) {
        let item = baskets.value[cardGroupName]?.find(i => i.id === itemId);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                removeItem(cardGroupName, itemId);
            }
        }
    }

    function setQuantity(cardGroupName, itemId, newQuantity) {
        let item = baskets.value[cardGroupName]?.find(i => i.id === itemId);
        if (item) {
            if (newQuantity >= 1 && newQuantity <= item.limit) {
                item.quantity = newQuantity;
            } else if (newQuantity < 1) {
                removeItem(cardGroupName, itemId);
            }
        }
    }

    function getTotalPrice(cardGroupName) {
        let total = 0;
        if (baskets.value[cardGroupName]) {
            baskets.value[cardGroupName].forEach(item => {
                total += item.unitPrice * item.quantity;
            });
        }
        return total;
    }

    return {
        baskets,
        addItem,
        removeItem,
        clearBasket,
        getBasket,
        increaseQuantity,
        decreaseQuantity,
        setQuantity,
        getTotalPrice,
    };
});
