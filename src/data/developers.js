// Format: Name|Role|Company|City|Skills|Rate ($/hr)|Experience (yrs)
const ROWS = `
Aarav Sharma|Frontend Engineer|PixelForge|Jaipur|React,TypeScript,Tailwind|35|4
Priya Verma|Backend Engineer|CloudNest|Bengaluru|Node.js,PostgreSQL,Docker|42|5
Rohan Mehta|Full Stack Developer|Stackly|Mumbai|React,Node.js,MongoDB|38|4
Ananya Iyer|UI/UX Engineer|DesignLoop|Chennai|Figma,React,CSS|33|3
Kabir Singh|DevOps Engineer|InfraWorks|Delhi|AWS,Kubernetes,Terraform|55|7
Sneha Kulkarni|Data Engineer|DataBridge|Pune|Python,Spark,Airflow|48|6
Vikram Rathore|Mobile Developer|AppSmith|Jaipur|React Native,Kotlin,Firebase|36|5
Neha Gupta|QA Automation Engineer|TestHive|Noida|Cypress,Jest,Selenium|28|4
Arjun Nair|Cloud Architect|SkyLayer|Kochi|AWS,Azure,Go|70|10
Ishita Bansal|Frontend Engineer|Webloom|Jaipur|Vue,JavaScript,SASS|30|3
Rahul Desai|Backend Engineer|CodeCraft|Ahmedabad|Java,Spring,Kafka|45|6
Meera Joshi|ML Engineer|NeuralPath|Hyderabad|Python,PyTorch,MLOps|65|6
Siddharth Rao|Security Engineer|SecureStack|Bengaluru|AppSec,Python,Burp Suite|60|7
Kavya Reddy|Full Stack Developer|LaunchPad|Hyderabad|Next.js,Prisma,PostgreSQL|44|5
Aditya Chauhan|Game Developer|PixelPlay|Gurugram|Unity,C#,Blender|40|4
Divya Menon|Product Engineer|Shipfast|Kochi|React,GraphQL,Node.js|46|5
Harsh Agarwal|Blockchain Developer|ChainBase|Indore|Solidity,Hardhat,Web3.js|58|4
Pooja Saxena|Technical Writer|DocuFlow|Lucknow|Docs,Markdown,APIs|25|4
Manish Yadav|Backend Engineer|ServeIt|Lucknow|Django,Redis,Celery|37|5
Tanvi Shah|Frontend Engineer|Brightly|Surat|React,Redux,Jest|34|4
Yash Pandey|Site Reliability Engineer|UptimeLabs|Bhopal|Prometheus,Linux,Python|52|6
Riya Malhotra|Data Analyst|InsightIQ|Chandigarh|SQL,Power BI,Python|30|3
Karan Kapoor|Android Developer|DroidWorks|Delhi|Kotlin,Jetpack,Room|39|5
Shruti Bhatt|iOS Developer|SwiftNest|Mumbai|Swift,SwiftUI,Combine|47|5
Devansh Jain|Full Stack Developer|Kodiak|Jaipur|MERN,AWS,Redis|36|4
Aisha Khan|AI Engineer|PromptLab|Bengaluru|LLMs,Python,LangChain|68|5
Nikhil Soni|Backend Engineer|GoFlow|Jodhpur|Go,gRPC,PostgreSQL|50|6
Simran Kaur|UI Designer|Pixelry|Amritsar|Figma,Framer,CSS|29|3
Gaurav Mishra|Platform Engineer|CoreStack|Pune|Kubernetes,Helm,Go|62|8
Ritika Sinha|Frontend Engineer|Layerly|Patna|React,Next.js,Tailwind|33|3
Abhishek Tiwari|Embedded Engineer|ChipWorks|Bengaluru|C++,RTOS,IoT|49|7
Nandini Pillai|QA Lead|QualityFirst|Thiruvananthapuram|Playwright,CI/CD,Jest|41|8
Mohit Goyal|Backend Engineer|PayRail|Gurugram|Node.js,Stripe,MySQL|44|5
Sakshi Dubey|Full Stack Developer|Craftly|Nagpur|Angular,NestJS,MongoDB|35|4
Varun Khanna|Data Scientist|ModelMint|Delhi|Python,scikit-learn,Pandas|55|6
Anjali Rawat|Frontend Engineer|Uplift|Dehradun|React,Vite,Accessibility|32|3
Pranav Kulshreshtha|Cloud Engineer|NimbusOps|Kanpur|GCP,Terraform,Python|51|6
Tanya Arora|Product Designer|Humanly|Mumbai|Research,Figma,Prototyping|38|5
Sahil Bhardwaj|Backend Engineer|Rustic|Chandigarh|Rust,Actix,PostgreSQL|57|5
Lakshmi Narayan|Database Engineer|QueryPoint|Chennai|PostgreSQL,Redis,Optimization|53|9
Utkarsh Dwivedi|Full Stack Developer|Buildly|Varanasi|Next.js,Supabase,TypeScript|37|3
Megha Chopra|Frontend Engineer|Skylark|Jaipur|React,Framer Motion,CSS|31|2
Rajat Malik|DevOps Engineer|PipeLine Co|Faridabad|Jenkins,Docker,Ansible|43|5
Bhavna Solanki|Mobile Developer|Flutterly|Udaipur|Flutter,Dart,Firebase|34|4
Omkar Patil|Backend Engineer|Nexora|Nashik|Java,Spring Boot,AWS|42|5
Sana Sheikh|Data Engineer|StreamLine|Bengaluru|Kafka,Flink,Scala|63|7
Tushar Bisht|Full Stack Developer|Himalaya Tech|Shimla|React,Express,PostgreSQL|33|3
Ayesha Farooqui|Cybersecurity Analyst|ShieldOne|Hyderabad|SOC,SIEM,Pen Testing|54|6
Lucas Meyer|Backend Engineer|Nordcode|Berlin|Elixir,Phoenix,PostgreSQL|72|8
Emily Carter|Frontend Engineer|BrightPath|Austin|React,Storybook,TypeScript|68|6
Diego Alvarez|Full Stack Developer|SolWeb|Madrid|Vue,Laravel,MySQL|60|6
Yuki Tanaka|Mobile Developer|Sakura Apps|Tokyo|Swift,Kotlin,Flutter|70|7
Olivia Brown|Engineering Manager|TeamCraft|London|Leadership,Agile,Roadmaps|85|11
Mateo Rossi|DevOps Engineer|Cloudia|Milan|AWS,Terraform,GitLab CI|66|7
`;

export const DEVELOPERS = ROWS.trim().split('\n').map((line, i) => {
  const [name, role, company, city, skills, rate, exp] = line.split('|');
  const handle = name.toLowerCase().replace(/[^a-z ]/g, '').replace(/ /g, '.');

return {
  id: i + 1,
  name,
  role,
  company,
  city,
  skills: skills.split(','),
  rate: Number(rate),
  exp: Number(exp),
  email: `${handle}@devsphere.dev`,
  username: handle.replace('.', '_'),
  jpUserId: (i % 10) + 1,
  available: i % 4 !== 3,

  // Demo avatar for each developer
  photo: `https://i.pravatar.cc/300?img=${(i % 70) + 1}`,

  // Clearly labelled demo contact details
  phone: `+91 90000 ${String(i + 1).padStart(5, '0')}`,

  // Demo address; replace with verified details before real use
  address: {
    city,
    state: 'Rajasthan',
    country: 'India',
    postalCode: String(301001 + i).slice(0, 6),
  },
};

});

export const ROLES = [...new Set(DEVELOPERS.map((d) => d.role))].sort();