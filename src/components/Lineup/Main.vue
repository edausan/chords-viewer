<script setup>
import { useQuery } from "@tanstack/vue-query";
import { getAllLineups, getAllSongs } from "../../api";
import { computed, ref, watchEffect } from "vue";
import LineupCard from "./lineupCard.vue";
import LineupDrawer from "./lineupDrawer.vue";
import RefreshButton from "./refreshButton.vue";

const { data, isLoading, isFetching, refetch } = useQuery({
	queryKey: ["lineups"],
	queryFn: async () => {
		const lineups = await getAllLineups();
		return lineups;
	},
	refetchOnWindowFocus: false,
	gcTime: 60 * 1000 * 60,
});

const { data: songs } = useQuery({
	queryKey: ["all-songs"],
	queryFn: async () => {
		const songs = await getAllSongs();
		return songs;
	},
	refetchOnWindowFocus: false,
	gcTime: 60 * 1000 * 60,
});

const lineup = computed(() => {
	if (data.value && songs.value) {
		return data.value
			.map((lineup) => {
				return {
					...lineup,
					songs: lineup.songs.map((song) => {
						if (song.id) {
							const filtered_song = songs.value.filter((s) => s.id === song.id)[0];
							if (filtered_song) {
								return {
									...song,
									chords: filtered_song?.chords,
								};
							}

							return song;
						}
					}),
				};
			})
			.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
	}
});

watchEffect(() => {
	const refreshButtonIcon = computed(() => document.getElementById("refresh-icon"));
	if (isFetching.value && refreshButtonIcon.value) {
		refreshButtonIcon.value.classList.add("animate-spin");
	} else {
		setTimeout(() => {
			refreshButtonIcon.value?.classList.remove("animate-spin");
		}, 900);
	}
});

const drawerEl = computed(() => document.getElementById("drawer"));
const showDrawer = () => drawerEl.value.classList.remove("translate-x-[-100%]");
const hideDrawer = () => drawerEl.value.classList.add("translate-x-[-100%]");

const selectedLineup = ref();
</script>

<template>
	<div style="margin-bottom: 20px">
		<RefreshButton @refetch="refetch()" />
		<LineupDrawer :lineup="selectedLineup" @hide-drawer="hideDrawer" />
		<LineupCard
			@show-drawer="showDrawer"
			@selected-lineup="(val) => (selectedLineup = val)"
			v-for="(item, index) in lineup"
			:key="index"
			:lineup="item" />
	</div>
</template>
