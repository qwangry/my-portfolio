export interface IContact {
    phone: string
    email: string
    city: string
    website: string
}

export interface IEducation{
    school: string
    degree: string
    gpa: string
    ranking?: string
    awards: string[]
    logo?: string
    schoolLink?: string
}

export interface IInternship {
    company: string
    position: string
    date: string
    description: string[]
}

export interface IProject {
    name: string
    description: string
    date: string
    stack: string[]
    work: string[]
    contributionLink?: string
}

export interface IResearch {
    name: string
    description: string
    date: string
    work: string[]
}

export interface ResumeData {
    name: string
    contact: IContact
    education: Array<IEducation>
    internship: Array<IInternship>
    projects: Array<IProject>
    research: Array<IResearch>
    skills: string[]
}

export const resumeData: ResumeData = {
    name: "Wang Ruying",
    contact: {
        phone: "199**4186",
        email: "qwangry123@163.com",
        city: "北京",
        website: "https://github.com/qwangry",
    },
    education: [
        {
            school: "中国科学院大学",
            degree: "网络与信息安全硕士",
            gpa: "3.79/4.00",
            awards: ["学业奖学金", "openGemini开源之星"],
            logo:"/src/assets/ucas.png",
            schoolLink:"https://www.ucas.ac.cn/",
        },
        {
            school: "郑州大学",
            degree: "软件工程学士",
            gpa: "3.65/4.00",
            ranking: "6/184（3.3%）",
            awards: [
                "全国大学生物理实验竞赛一等奖",
                "蓝桥杯大赛(Java)省三等奖",
                "网络技术挑战赛省三等奖",
                "国家励志奖学金",
                "郑州大学一等奖学金",
                "郑州大学三好学生",
            ],
            logo:"/src/assets/zzu.png",
            schoolLink:"https://www.zzu.edu.cn/",
        },
    ],
    internship: [
        {
            company: "河南森思软件科技有限公司",
            position: "前端开发工程师",
            date: "2022.03-2022.05",
            description: [
                "参与需求分析与系统设计，与后端团队紧密合作，确保前后端高效对接并精准实现功能",
                "独立完成多个功能页面的开发，根据设计原型确保页面交互和用户体验符合预期",
                "参与自动化发布与部署流程，通过 CI/CD 工具实现自动集成与快速上线，缩短了发布周期",
            ],
        }
    ],
    projects: [
        {
            name: "律师事务所综合管理系统",
            description: "面向律师事务所的综合管理系统，涵盖平台官网、案件管理、CRM、律师评价、知识库等多个子系统，提供从案件管理到内部办公的一站式解决方案",
            date: "2023.12-2024.03",
            stack: ["React", "Mobx", "Ant Design", "Typescript", "Vite"],
            work: [
                "负责案件管理系统、平台官网等多个子系统的前端开发",
                "封装通用表格组件，提高组件复用率，减少维护成本，提高整体开发效率",
            ],
        },
        {
            name: "校内二手交易平台",
            description: "面向校内用户的二手交易平台，旨在解决传统群聊交易模式中的诸多弊端，提供更安全、便捷、高效的二手物品交易体验通过平台，学生可以轻松发布和查找商品，并通过内置的聊天功能安全地与发布者沟通",
            date: "2022.03-2022.05",
            stack: ["HTML", "CSS", "JavaScript", "WebSocket"],
            work: [
                "负责平台的前端架构设计与开发，确保代码结构清晰、可维护性高",
                "封装 WebSocket 实现实时在线聊天功能，提升用户沟通效率",
                "封装 Axios 统一管理 API 交互，提高代码复用性与维护效率",
            ]
        },
        {
            name: "openGauss社区贡献VitePress",
            description: "参与openGauss社区任务",
            date: "2024.06-2024.08",
            stack: ["VitePress", "Playwright"],
            work: [
                "升级官网 VitePress 框架至社区最新版本",
                "基于 Playwright 编写 E2E 测试代码，确保网站功能的稳定性与可靠性",
            ],
            contributionLink: "https://gitee.com/opengauss/website/commits/v2?user=qwangry123",
        },
        {
            name: "openGemini社区贡献",
            description: "参与openGemini开源社区任务",
            date: "2023.06-2023.09",
            stack: ["Python", "Go", "VuePress"],
            work: [
                "使用Python和Go语言完成openGemini项目在Windows平台上的编译与运行",
                "保证项目在不同操作系统上的兼容性",
                "参与了项目的文档翻译与维护工作",
            ],
            contributionLink: "https://github.com/openGemini/openGemini/commits?author=qwangry",
        },
        {
            name: "TinyEditor社区贡献",
            description: "参与TinyEditor社区任务",
            date: "2024.12-2025.01",
            stack: ["VitePress", "Typescript"],
            work: [
                "累计提交7个PR",
                "新增多文件上传与图片右键菜单功能",
                "优化编辑器用户体验",
            ],
            contributionLink: "https://github.com/opentiny/tiny-editor/commits?author=qwangry",
        }
    ],
    research: [
        {
            name: "恶意流量识别研究",
            description: "针对防火墙所面临的新型攻击流量进行深入分析，旨在设计并实现有效的攻击流量识别与检测方案，提高网络安全防护能力及对新型攻击的响应能力",
            date: "2024.03-2025.03",
            work: [
                "调研报告撰写：深入调研针对防火墙的不同类型的攻击，撰写详细的研究报告，提供全面的理论支持，指导项目实施",
                "攻击特征分析：系统性地分析不同类型攻击特征，设计并实现识别和检测方案，提高流量异常检测的准确性",
                "数据集构建与模型训练：基于真实攻击流量构建数据集，优化特征提取和机器学习模型，提高恶意流量检测的精准度",
            ]
        }
    ],
    skills: [
        "熟悉 HTML5 / CSS3 / JavaScript / ES6+",
        "熟悉 React / MobX / TypeScript，具备前端组件化开发能力，理解 React 运行机制",
        "了解 Webpack / Vite 项目构建工具",
        "了解 Playwright 进行前端自动化测试",
        "理解计算机网络 / 数据结构 / 算法基础知识",
        "了解 Java / Python，了解 MySQL 基本操作",
        "了解 Linux 基本指令",
        "了解 Nginx 基本配置",
        "了解 Git 版本控制工具",
    ]
}