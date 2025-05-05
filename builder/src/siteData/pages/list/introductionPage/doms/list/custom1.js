const dom = {
    "type": "custom",
    "content": `<div class="w-full flex flex-col gap-6 justify-center items-center text-lg">
                    <h1 class="text-main text-center text-[2.25rem] leading-10 font-bold">{{$t("introductionPage.title1")}}</h1>
                    <div class="max-w-[1000px] flex flex-col gap-4 justify-center items-center">
                        <p class="text-center">{{$t("introductionPage.desc1")}}</p>
                        <img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl dark:hidden" title="process" src="/images/process.png" />
                        <img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl hidden dark:block" title="process" src="/images/process-dark.png" />
                    </div>
                    <div class="max-w-[1000px] flex flex-col gap-4 justify-center items-center">
                        <h2 class="text-main text-center text-[1.75rem] font-semibold">{{$t("introductionPage.title2")}}</h2>
                        <p>{{$t("introductionPage.desc2")}}</p>
                        <img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl dark:hidden" title="json config" src="/images/json-detail.png" />
                        <img style="border-width:4px;" class="mb-4 px-4 py-2 border border-dashed border-main dark:border-bg rounded-xl hidden dark:block" title="json config" src="/images/json-detail-dark.png" />
                        <span><span class="font-semibold">{{$t("introductionPage.desc3-1")}} </span>{{$t("introductionPage.desc3-2")}}</span>
                        <span><span class="font-semibold">{{$t("introductionPage.desc4-1")}} </span>{{$t("introductionPage.desc4-2")}}</span>
                        <span><span class="font-semibold">{{$t("introductionPage.desc5-1")}} </span>{{$t("introductionPage.desc5-2")}}</span>
                        <span>{{$t("introductionPage.desc6")}}</span>
                    </div>
                </div>`
};

module.exports = dom;