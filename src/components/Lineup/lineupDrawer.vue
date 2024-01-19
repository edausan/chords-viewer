<script setup>
import moment from "moment";
import { transformLabel } from "./composable/useTransformLabel";

const props = defineProps({
	lineup: Object,
});
defineEmits(["hideDrawer"]);
</script>

<template>
	<section
		id="drawer"
		class="fixed overflow-y-auto left-0 top-0 h-[100vh] w-[100vw] bg-neutral-900 translate-x-[-100%] transition-all ease-in-out p-2">
		<div class="flex items-center p-2">
			<div class="flex-1" v-if="$props.lineup">
				<div>
					<strong>{{ moment($props.lineup.date).format("LL") }}</strong>
				</div>
				<small><i>Worship Leader:</i> {{ $props.lineup.worship_leader.displayName }}</small>
			</div>
			<button @click="$emit('hideDrawer')">Close</button>
		</div>

		<section class="p-2" v-if="$props.lineup">
			<div v-for="(song, index) in $props?.lineup?.songs" :key="index" class="p-2 bg-neutral-800 rounded-md mb-2">
				<section v-if="song.title" class="flex flex-col mb-2">
					<small class="text-slate-500"
						><i>{{ transformLabel(song.label) }}</i></small
					>
					<small>{{ song.title }}</small>
				</section>

				<section>
					<div class="mb-2" v-if="song?.chords?.verse">
						<small class="text-cyan-700"><strong>Verse</strong></small>
						<p>{{ song?.chords?.verse }}</p>
					</div>

					<div class="mb-2" v-if="song?.chords?.pre_chorus">
						<small class="text-cyan-700"><strong>Pre chorus:</strong></small>
						<p>{{ song?.chords?.pre_chorus }}</p>
					</div>

					<div class="mb-2" v-if="song?.chords?.chorus">
						<small class="text-cyan-700"><strong>Chorus:</strong></small>
						<p>{{ song?.chords?.chorus }}</p>
					</div>
				</section>
			</div>
		</section>
	</section>
</template>
