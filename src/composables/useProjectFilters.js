import { computed, ref } from "vue";
import { projects } from "../data/portfolio.js";

export function useProjectFilters(t) {
  const projectSearch = ref("");
  const selectedTechnology = ref("All projects");
  const technologyFilters = [
    "All projects",
    "HTML",
    "CSS",
    "JavaScript",
    "Vue.js",
    "Python",
    "Node.js",
    "MySQL",
  ];
  const filteredProjects = computed(() => {
    const search = projectSearch.value.trim().toLocaleLowerCase();
    return projects.filter((project) => {
      const matchesTechnology =
        selectedTechnology.value === "All projects" ||
        project.tags.includes(selectedTechnology.value);
      const searchable = [
        project.title,
        project.category,
        project.description,
        project.role,
        ...project.tags,
      ]
        .flatMap((value) => [value, t(value)])
        .join(" ")
        .toLocaleLowerCase();
      return matchesTechnology && (!search || searchable.includes(search));
    });
  });
  function clearFilters() {
    projectSearch.value = "";
    selectedTechnology.value = "All projects";
  }
  return {
    projectSearch,
    selectedTechnology,
    technologyFilters,
    filteredProjects,
    clearFilters,
  };
}
