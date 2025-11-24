import { Project, SiteSection } from './types';

export const SITE_CONFIG = {
  title: "Yorick Zhong",
  name: "Yorick Zhong",
  role: "CS Student @ CityU HK",
  heroSubtitle: "A second-year Computer Science student passionate about AI, Robotics, and Web Development.",
  email: "yqzhong5-c@my.cityu.edu.hk",
  github: "https://github.com/Yorick1014",
  cvLink: "https://github.com/Yorick1014", // Placeholder for actual CV link
};

export const ABOUT_CONTENT = {
  // REPLACE THIS URL with your actual photo URL or local path (e.g. "/assets/yorick.jpg")
  profileImage: "https://placehold.co/400x400/1e293b/818cf8?text=Yorick+Photo", 
  introduction: [
    "I am Yorick Zhong, a second-year Computer Science student at City University of Hong Kong. My academic journey is driven by a curiosity for how software interacts with the physical world, from web interfaces to robotics.",
    "I have practical experience building web applications with React and Tailwind CSS, as well as developing backend logic and AI models using Python and Java. I love tackling course projects that challenge me to learn new frameworks like Detectron2 for computer vision."
  ],
  skills: ['React', 'Tailwind CSS', 'Python', 'Java', 'C++', 'Git', 'OpenCV']
};

export const NAV_SECTIONS: SiteSection[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About & AI Chat' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const RESUME_CONTEXT = `
Name: ${SITE_CONFIG.name}
Role: ${SITE_CONFIG.role}
Education: City University of Hong Kong
Skills: ${ABOUT_CONTENT.skills.join(', ')}.
Background: ${SITE_CONFIG.heroSubtitle}
Projects: AI Waste Scanner (Computer Vision), Line Tracing Robot, Employee Annual Leave System (Java), Tech Company Website.
Interests: Artificial Intelligence, Robotics, Web Development.
Contact: ${SITE_CONFIG.email}
Github: ${SITE_CONFIG.github}
`;

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI Waste Scanner',
    description: 'A waste classification system using computer vision to identify recyclables.',
    tags: ['Python', 'Detectron2', 'AI', 'Roboflow'],
    // Using a placeholder service with text to ensure the image is meaningful. 
    // You can replace this URL with your actual project screenshot in the future.
    imageUrl: 'https://placehold.co/600x400/1e293b/818cf8?text=AI+Waste+Scanner',
    fullDetails: 'Built using the Detectron2 model and trained on a customized dataset via Roboflow. This application classifies waste types to assist in proper recycling sorting.'
  },
  {
    id: '2',
    title: 'Line Tracing Robot',
    description: 'An autonomous robot capable of following paths with manual override controls.',
    tags: ['Python', 'OpenCV', 'Robotics', 'Git'],
    imageUrl: 'https://placehold.co/600x400/1e293b/818cf8?text=Line+Tracing+Robot',
    fullDetails: 'Developed the control logic and vision system using Python and OpenCV. Features include autonomous line tracing and a manual control mode.'
  },
  {
    id: '3',
    title: 'Employee Leave System',
    description: 'A comprehensive Java-based command line application for managing annual leave.',
    tags: ['Java', 'Git', 'CLI', 'OOP'],
    imageUrl: 'https://placehold.co/600x400/1e293b/818cf8?text=Java+Leave+System',
    fullDetails: 'A course project implementing an Employee Annual Leave System. Built with Java, focusing on Object-Oriented Programming principles and version control via Git.'
  },
  {
    id: '4',
    title: 'Tech Company Website',
    description: 'A responsive corporate website designed for a technology firm.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    imageUrl: 'https://placehold.co/600x400/1e293b/818cf8?text=Tech+Company+Website',
    fullDetails: 'Course project involving the design and implementation of a professional website using standard web technologies (HTML, CSS, JS).'
  }
];