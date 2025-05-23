<script lang="ts">
  import { abbreviateNumber } from "$lib/utils";
  import Table from "$lib/components/Table/Table.svelte";
  import Infobox from "$lib/components/Infobox.svelte";
  import SEO from "$lib/components/SEO.svelte";
  import { page } from "$app/stores";

  export let data;
  let rawData = data?.getData;

  let totalMarketCap =
    rawData?.reduce((total, stock) => total + stock?.marketCap, 0) ?? 0;
  let totalRevenue =
    rawData?.reduce((total, stock) => total + stock?.revenue, 0) ?? 0;

  const navigation = [
    {
      title: "A List of The Five FAANG Companies",
      description:
        "The FAANG stocks are a list of five U.S. technology companies: Facebook (now Meta), Amazon, Apple, Netflix and Alphabet (Google).",
      info: "The FAANG stocks refer to five major U.S. tech companies: Meta (formerly Facebook), Amazon, Apple, Netflix, and Alphabet (Google). Originally popularized by Jim Cramer as FAANG.",
      link: "/list/faang",
    },
    {
      title: "A List of All Magnificent Seven Stocks",
      description:
        "The Magnificent Seven stocks refer to seven leading U.S. technology companies: Meta (formerly Facebook), Amazon, Apple, Microsoft, Nvidia, Alphabet (Google), and Tesla.",
      info: "The magnificent seven stocks are 7 technology stocks that drove a large portion of the market's returns in 2023 and 2024. The list includes Apple, Microsoft, Amazon, Alphabet (Google), Tesla, Nvidia and Meta Platforms.",
      link: "/list/magnificent-seven",
    },
    {
      title: "A List of Artificial Intelligence (AI) Stocks",
      description: "",
      info: "This is a list of the top stocks that are directly involved with artificial intelligence (AI) and/or have significant exposure to the growth of AI technology.",
      link: "/list/ai-stocks",
    },
    {
      title: "A List of Augmented Reality Stocks",
      description: "",
      info: "",
      link: "/list/augmented-reality",
    },
    {
      title: "A List of Augmented Reality Stocks",
      description: "",
      info: "",
      link: "/list/augmented-reality",
    },
    {
      title: "A List of Gaming Company Stocks by Market Cap",
      description: "",
      info: "The biggest gaming company stocks, ranked by market cap. This list includes stocks of companies who get a significant percentage of their revenue from video games or gaming-related products.",
      link: "/list/gaming-stocks",
    },
    {
      title: "The Biggest Pharmaceutical Stocks by Market Cap",
      description:
        "A list of the biggest pharmaceutical and drug company stocks, ranked by market cap.",
      info: "",
      link: "/list/pharmaceutical-stocks",
    },
    {
      title: "A List of Online Dating Stocks",
      description: "",
      info: "",
      link: "/list/online-dating",
    },
    {
      title: "A List of Virtual Reality Stocks",
      description: "",
      info: "",
      link: "/list/virtual-reality",
    },
    {
      title: "A List of Online Gambling Stocks",
      description: "",
      info: "",
      link: "/list/online-gambling",
    },
    {
      title: "A List of Sports Betting Stocks",
      description: "",
      info: "",
      link: "/list/sports-betting",
    },
    {
      title: "A List of Metaverse Stocks, Sorted by Market Cap",
      description:
        "These are the biggest stocks that are making significant investments in the metaverse, a concept related to virtual worlds accessed through augmented and virtual reality devices.",
      info: "The metaverse is a concept for virtual environments that people can access through the internet, usually via augmented reality (AR) or virtual reality (VR) devices. Many companies are making huge investments in the metaverse, which is expected to become a big market in the future.",
      link: "/list/metaverse",
    },
  ];

  // Using the reactive statement to update currentNavigation based on the current page URL
  $: currentNavigation = navigation?.find(
    (cat) => $page.url.pathname === cat?.link,
  );
</script>

<SEO
  title={currentNavigation?.title}
  description={currentNavigation?.description}
/>

<section class="w-full overflow-hidden m-auto">
  {#if currentNavigation?.info}
    <Infobox text={currentNavigation?.info} />
  {/if}

  <div
    class="shadow-xs mt-6 mb-4 flex flex-col divide-y divide-gray-300 dark:divide-gray-600 rounded border border-gray-300 dark:border-gray-600 sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0"
  >
    <div class="px-4 py-3 sm:px-2 sm:py-5 md:px-3 lg:p-6">
      <div class="flex items-center justify-between sm:block">
        <div class="text-[1rem] font-semibold">Total Stocks</div>
        <div
          class="mt-1 break-words font-semibold leading-8 text-xl sm:text-2xl"
        >
          {new Intl.NumberFormat("en")?.format(rawData?.length)}
        </div>
      </div>
    </div>
    <div class="px-4 py-3 sm:px-2 sm:py-5 md:px-3 lg:p-6">
      <div class="flex items-center justify-between sm:block">
        <div class="text-[1rem] font-semibold">Total Market Cap</div>
        <div
          class="mt-1 break-words font-semibold leading-8 text-xl sm:text-2xl"
        >
          {abbreviateNumber(totalMarketCap)}
        </div>
      </div>
    </div>
    <div class="px-4 py-3 sm:px-2 sm:py-5 md:px-3 lg:p-6">
      <div class="flex items-center justify-between sm:block">
        <div class="text-[1rem] font-semibold">Total Revenue</div>
        <div
          class="mt-1 break-words font-semibold leading-8 text-xl sm:text-2xl"
        >
          {abbreviateNumber(totalRevenue)}
        </div>
      </div>
    </div>
  </div>

  <Table {data} rawData={data?.getData} />
</section>
