<script lang="ts">
  export let message: { text: string; role: "user" | "system" };
  export let isLoading = false;
</script>

<div class="flex mb-6" class:justify-end={message.role === "user"}>
  <div class="flex flex-col sm:flex-row items-start">
    <img
      class="mr-auto mb-2 sm:mb-0 sm:mr-3 w-10 h-10 rounded-full {message.role ===
      'user'
        ? 'hidden'
        : ''}"
      src="/pwa-192x192.png"
      alt="Stocknear Logo"
      loading="lazy"
    />
    <div
      class="rounded p-3 min-w-14 w-full shadow border border-gray-300 dark:border-gray-700 {message?.role ===
      'user'
        ? 'ml-auto'
        : 'mr-auto'}"
    >
      {#if isLoading}
        <div class=" text-center">
          <span class="loading loading-dots loading-sm"></span>
        </div>
      {:else}
        <p>{@html message?.content}</p>
      {/if}
    </div>
  </div>
</div>
