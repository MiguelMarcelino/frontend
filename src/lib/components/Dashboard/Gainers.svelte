<script lang="ts">
  import * as Card from "$lib/components/shadcn/card/index.ts";
  import * as Table from "$lib/components/shadcn/Table/index.ts";
  import Infobox from "$lib/components/Infobox.svelte";
  import { abbreviateNumber } from "$lib/utils";

  export let marketStatus = 0;
  export let gainersList;
  export let charNumber = 30;
</script>

<Card.Root
  class="bg-gray-50 dark:bg-default overflow-x-auto overflow-hidden overflow-y-auto no-scrollbar "
>
  <Card.Header class="flex flex-row items-center">
    <div class="flex flex-col items-start w-full">
      <div class="flex flex-row w-full items-center">
        <Card.Title
          ><a
            href={`/market-mover/${marketStatus === 0 ? "gainers" : marketStatus === 1 ? "premarket/gainers" : "afterhours/gainers"}`}
            class="text-xl sm:text-2xl text-muted dark:text-white font-semibold cursor-pointer sm:hover:underline sm:hover:underline-offset-4"
          >
            {marketStatus === 0
              ? "Top"
              : marketStatus === 1
                ? "Pre-Market"
                : "Afterhours"} Gainers
            <svg
              class="h-5 w-5 inline-block"
              viewBox="0 0 20 20"
              fill="currentColor"
              style="max-width:40px"
              aria-hidden="true"
              ><path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path></svg
            ></a
          >
        </Card.Title>
      </div>
    </div>
  </Card.Header>
  <Card.Content>
    {#if gainersList?.length > 0}
      <Table.Root class="overflow-x-auto w-full">
        <Table.Header>
          <Table.Row>
            <Table.Head class=" text-left text-sm font-bold dark:font-semibold"
              >Symbol</Table.Head
            >
            <Table.Head
              class="hidden sm:table-cell text-sm font-bold dark:font-semibold"
              >Name</Table.Head
            >
            <Table.Head class=" text-right text-sm font-bold dark:font-semibold"
              >Price</Table.Head
            >
            <Table.Head class=" text-right text-sm font-bold dark:font-semibold"
              >Change</Table.Head
            >
            <!--
                      <Table.Head
                        class=" text-right font-semibold whitespace-nowrap"
                        >Market Cap</Table.Head
                      >
                        -->
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each gainersList as item}
            <Table.Row>
              <Table.Cell class="text-sm sm:text-[1rem]">
                <a
                  href={`/stocks/${item?.symbol}`}
                  class="text-blue-700 dark:text-blue-400 sm:hover:text-muted dark:sm:hover:text-white cursor-pointer"
                  >{item?.symbol}</a
                >
              </Table.Cell>
              <Table.Cell
                class="hidden sm:table-cell xl:table.-column text-sm sm:text-[1rem]"
              >
                {item?.name?.length > charNumber
                  ? item?.name?.slice(0, charNumber) + "..."
                  : item?.name}
              </Table.Cell>
              <Table.Cell
                class="text-right xl:table.-column text-sm sm:text-[1rem]"
              >
                ${item?.price?.toFixed(2)}
              </Table.Cell>
              <Table.Cell
                class="text-right md:table.-cell xl:table.-column text-sm sm:text-[1rem] text-white"
              >
                {#if item?.changesPercentage >= 0}
                  <span class="text-green-800 dark:text-[#00FC50]"
                    >+{item?.changesPercentage >= 1000
                      ? abbreviateNumber(item?.changesPercentage)
                      : item?.changesPercentage?.toFixed(2)}%</span
                  >
                {:else}
                  <span class="text-red-800 dark:text-[#FF2F1F]"
                    >{item?.changesPercentage <= -1000
                      ? abbreviateNumber(item?.changesPercentage)
                      : item?.changesPercentage?.toFixed(2)}%
                  </span>
                {/if}
              </Table.Cell>
              <!--
                        <Table.Cell
                          class="text-right xl:table.-column text-sm sm:text-[1rem]"
                        >
                          {abbreviateNumber(item?.marketCap)}
                        </Table.Cell>
                        -->
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
    {:else}
      <Infobox text="Currently, no market gainer data is available." />
    {/if}
  </Card.Content>
</Card.Root>
