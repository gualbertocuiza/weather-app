<template>
  <div class="w-96">
    <div class="card w-auto shadow-xl">
      <div class="card-body">
        <h1 class="text-3xl">San Francisco</h1>
        <small>Mon, 23:30 PM, Mostly sunny</small>
        <div class="weahter flex justify-between">
          <h1>23°C</h1>
          <img
            src="//cdn.weatherapi.com/weather/64x64/day/116.png"
            alt="sunny"
            width="90"
            height="90"
          />
        </div>
        <div class="divider"></div>
        <div class="text-sm tracking-wide text-gray-500">
          <div class="flex justify-between mb-2">
            <span>Windy</span>
            <span>23 km/h</span>
          </div>
          <div class="flex justify-between mb-2">
            <span>Windy Dir</span>
            <span>W</span>
          </div>
          <div class="flex justify-between mb-2">
            <span>Humidity</span>
            <span>58</span>
          </div>
          <div class="flex justify-between mb-2">
            <span>cloud</span>
            <span>75</span>
          </div>
          <div class="flex justify-between mb-2">
            <span>Feels like</span>
            <span>8.1°C</span>
          </div>
        </div>
        <div class="divider"></div>
        <div class="card-actions justify-end">
          <button class="btn btn-neutral btn-sm">Full report</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weahter h1 {
  font-size: 4em;
  color: gray;
}
</style>
