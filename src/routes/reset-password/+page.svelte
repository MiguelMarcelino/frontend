<script lang="ts">
  import { toast } from "svelte-sonner";
  import { mode } from "mode-watcher";
  import { enhance } from "$app/forms";

  import SEO from "$lib/components/SEO.svelte";

  let email: string = "";
  let loading = false;
  let isClicked = false;

  const submitReset = () => {
    loading = true;
    return async ({ result, update }) => {
      switch (result.type) {
        case "success":
          toast.success("Password resetted. Check your emails!", {
            style: `border-radius: 5px; background: #fff; color: #000; border-color: ${$mode === "light" ? "#F9FAFB" : "#4B5563"}; font-size: 15px;`,
          });
          await update();
          break;
        case "redirect":
          isClicked = true;
          toast.success("Password resetted. Check your emails!", {
            style: `border-radius: 5px; background: #fff; color: #000; border-color: ${$mode === "light" ? "#F9FAFB" : "#4B5563"}; font-size: 15px;`,
          });
          await update();
          break;
        case "failure":
          toast.error("Invalid credentials", {
            style: `border-radius: 5px; background: #fff; color: #000; border-color: ${$mode === "light" ? "#F9FAFB" : "#4B5563"}; font-size: 15px;`,
          });
          await update();
          break;
        case "error":
          toast.error(result.error.message, {
            style: `border-radius: 5px; background: #fff; color: #000; border-color: ${$mode === "light" ? "#F9FAFB" : "#4B5563"}; font-size: 15px;`,
          });
          break;
        default:
          await update();
      }
      loading = false;
    };
  };
</script>

<SEO
  title="Reset Password"
  description="Reset your password to sign in to your Stocknear account."
/>

<div
  class="flex flex-col items-center min-h-screen w-full max-w-3xl m-auto mt-20"
>
  <h2 class="text-center text-3xl font-bold tracking-tight">
    Reset Your Password
  </h2>
  <p class="text-center mt-1">
    We'll send you an email with a link to reset your password.
  </p>
  <form
    action="?/reset"
    method="POST"
    use:enhance={submitReset}
    class="flex flex-col items-center space-y-2 w-5/6 sm:w-full pt-4"
  >
    <input
      name="email"
      class="input input-lg input-bordered border border-gray-600 focus:outline-none w-full max-w-lg bg-white dark:bg-secondary placeholder-gray-600 dark:placeholder-gray-300 whitespace-normal"
      type="email"
      required
      bind:value={email}
      autocomplete="off"
    />
    <div class="w-full max-w-lg">
      <div class="w-full max-w-lg pt-2 m-auto pb-5">
        {#if !loading && !isClicked}
          <button
            type="submit"
            class="cursor-pointer py-2.5 bg-[#3B82F6] dark:bg-[#fff] border-none sm:hover:bg-blue-600 dark:sm:hover:bg-gray-300 transition duration-100 btn-md w-full rounded m-auto text-white dark:text-black font-semibold text-[1rem]"
          >
            <span> Request Password Reset</span>
          </button>
        {:else}
          <label
            class="cursor-not-allowed btn bg-[#3B82F6] dark:bg-[#fff] opacity-[0.5] border border-gray-600 sm:hover:bg-blue-600 dark:sm:hover:bg-gray-300 transition duration-100 btn-md w-full rounded m-auto text-white dark:text-black font-semibold text-[1rem]"
          >
            <div class="flex flex-row m-auto items-center">
              <span class="loading loading-infinity"></span>
              <span class="ml-1.5">Resetting</span>
            </div>
          </label>
        {/if}
      </div>
    </div>
  </form>
</div>
