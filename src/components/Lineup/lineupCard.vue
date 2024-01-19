<script setup>
import moment from "moment";
import { transformLabel } from "./composable/useTransformLabel";

const props = defineProps({
	lineup: Object,
});

const emit = defineEmits(["showDrawer", "selectedLineup"]);

const showLineup = () => {
	emit("showDrawer");
	emit("selectedLineup", props.lineup);
};
</script>

<template>
	<div>
		<section @click="showLineup" class="dark:bg-neutral-900 p-2 rounded-md mb-4 shadow-sm hover:shadow-lg cursor-pointer">
			<section class="p-2 border border-neutral-900 border-b-neutral-700">
				<div>
					<strong>{{ moment($props.lineup.date).format("LL") }}</strong>
				</div>
				<small><i>Worship Leader:</i> {{ $props.lineup.worship_leader.displayName }}</small>
			</section>

			<section class="p-2">
				<div v-for="(song, index) in $props.lineup.songs" :key="index">
					<div v-if="song.title">
						<small class="text-slate-500"
							><i>{{ transformLabel(song.label) }}</i></small
						>
						<div>{{ song.title }}</div>
					</div>
				</div>
			</section>
		</section>
	</div>
</template>
