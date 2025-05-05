const dom =  {
    "type": "custom",
    "content": `<div class="w-full flex justify-center items-center mt-4">
        <div class="w-full py-0 gap-8 flex justify-between items-center">
        <div></div>
        <button @click="sharedFunctions.getPageByPath(route.path)" class="px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">{{$t("thisPage")}}</button>
        </div>
    </div>`
};

module.exports = dom;