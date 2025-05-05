const dom =  {
    "type": "custom",
    "content": `<div class="w-full py-0  md:px-0 mt-2 flex justify-center items-center">
                    <div class="p-6 w-full max-w-[1000px]">
                        <h1 class="text-3xl font-bold text-center mb-6">{{$t("configurationPage.title1")}}</h1>
                        <ol class="list-decimal list-inside space-y-4">
                            <li>
                                <strong>{{$t("configurationPage.subtitle1")}}</strong>
                                <p>{{$t("configurationPage.desc1")}}</p>
                                <pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>npm install</code></pre>
                            </li>
                            <li>
                                <strong>{{$t("configurationPage.subtitle2")}}</strong>
                                <p>{{$t("configurationPage.desc2")}}</p>
                            </li>
                            <li>
                                <strong>{{$t("configurationPage.subtitle3")}}</strong>
                                <p>{{$t("configurationPage.desc3")}}</p>
                                <pre class="bg-darkBg text-bg dark:bg-black p-4 mt-2 rounded-md overflow-hidden"><code>npm run generate</code></pre>
                            </li>
                        </ol>
                    </div>
                </div>`
};

module.exports = dom;