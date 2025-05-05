const dom =  {
    "type": "custom",
    "content": `<div class="w-full py-2 mt-2 flex justify-center items-center">
                    <div class="w-full max-w-[1000px] gap-8 flex justify-between items-center">
                        <button @click=gettingStarted class="px-4 py-2 bg-third text-white shadow-md text-xl font-bold rounded-lg">{{$t("introductionPage.button")}}</button>
                        <button @click="sharedFunctions.getPageByPath(route.path)" class="px-4 py-2 bg-main text-white shadow-md text-xl font-bold rounded-lg">{{$t("thisPage")}}</button>
                    </div>
                </div>`
};

module.exports = dom;