const dom = {
    "type": "custom",
    "content": `<div id="changesModal" class="fixed bottom-0 flex-col justify-center items-center gap-2 w-[400px] px-8 py-4 max-w-full bg-bg text-darkBg rounded-t-lg">
                    <div class="w-full flex justify-center items-center gap-4 text-sm"><input id="showChangedCells" type="checkbox" /><span>Show changed cells</span></div>
                    <div class="flex flex-col justify-center items-center gap-8">
                    <h1 class="text-2xl font-bold">Some changes were noticed</h1>
                    <div class="flex gap-4 w-full">
                        <button @click="saveCellChanges" class="w-1/2 px-4 py-2 bg-green-600 text-white shadow-md text-xl font-bold rounded-lg">{{$t("datatablesPage.save")}}</button>
                        <button @click="cancelCellChanges" class="w-1/2 px-4 py-2 bg-red-600 text-white shadow-md text-xl font-bold rounded-lg">{{$t("datatablesPage.cancel")}}</button>
                    </div>
                    </div>
                </div>`
};

module.exports = dom;