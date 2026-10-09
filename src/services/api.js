
import axios from "axios";

// ========================================
// DEVSPHERE API CONFIGURATION
// ========================================

// Developer profile API
const profileClient = axios.create({
  baseURL: "https://randomuser.me/api",
  timeout: 10000,
  params: {
    results: 10,
    nat: "in",
    seed: "devsphere-india",
  },
});

// Posts API
const postsClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
});

// ========================================
// LOAD DEVELOPER DIRECTORY
// ========================================

export async function fetchDevelopers() {
  const response = await profileClient.get("/");

  return response.data.results.map((person, index) => {
    const rawPostcode = String(person.location.postcode ?? "");
    const validPinCode = /^\d{6}$/.test(rawPostcode);

    return {
      id: index + 1,

      name: `${person.name.first} ${person.name.last}`,

      username: person.login.username,

      email: person.email,

      phone: person.phone,

      photo: person.picture.large,

      website: "",

      address: {
        country: "India",
        city: person.location.city,
        street: `${person.location.street.number} ${person.location.street.name}`,
        zipcode: validPinCode ? rawPostcode : "",
      },

      // These fields are demo defaults because
      // RandomUser does not provide developer skills.
      company: {
        name: "Independent Developer",
      },

      role: "Software Developer",

      focus: "Web Development & Technology",
    };
  });
}

// ========================================
// LOAD ONE DEVELOPER PROFILE
// ========================================

export async function fetchDeveloper(id) {
  const developers = await fetchDevelopers();

  return (
    developers.find(
      (developer) => developer.id === Number(id)
    ) ?? null
  );
}

// ========================================
// LOAD DEVELOPER POSTS
// ========================================

export async function fetchDeveloperPosts(id) {
  const response = await postsClient.get(
    `/posts/user/${id}`,
    {
      params: {
        limit: 6,
      },
    }
  );

  return response.data.posts.map((post) => ({
    id: post.id,
    title: post.title,
    body: post.body,
  }));
}

// ========================================
// FRIENDLY API ERROR MESSAGES
// ========================================

export function getErrorMessage(error) {
  if (
    error?.code === "ECONNABORTED" ||
    error?.code === "ETIMEDOUT"
  ) {
    return "The request timed out. Please try again.";
  }

  if (error?.response) {
    const { status } = error.response;

    if (status === 404) {
      return "The requested information could not be found.";
    }

    if (status >= 500) {
      return `The server encountered a problem (${status}). Please try again later.`;
    }

    return `The request failed with status ${status}.`;
  }

  if (error?.request) {
    return "Network error. Please check your internet connection.";
  }

  return error?.message || "Something went wrong.";
}

// Default Axios client for any existing imports.
const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;