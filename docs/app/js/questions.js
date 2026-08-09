// 南京中考闯关题库 - 化学篇
// 从知识库内容提取

const QUESTION_BANK = {
  chemistry: {
    name: "化学",
    icon: "🧪",
    color: "#10b981",
    topics: {
      basics: {
        name: "物质变化与分类",
        questions: [
          {
            id: "ch_b_001",
            type: "choice",
            question: "下列变化属于化学变化的是？",
            options: ["水蒸发", "铁生锈", "玻璃破碎", "冰雪融化"],
            answer: 1,
            explanation: "铁生锈有新物质Fe₂O₃生成，属于化学变化"
          },
          {
            id: "ch_b_002",
            type: "choice",
            question: "下列物质属于混合物的是？",
            options: ["蒸馏水", "氧气", "空气", "二氧化碳"],
            answer: 2,
            explanation: "空气由多种气体混合而成，是混合物"
          },
          {
            id: "ch_b_003",
            type: "choice",
            question: "下列物质的颜色为蓝色的是？",
            options: ["CuO", "Fe₂O₃", "CuSO₄溶液", "KMnO₄"],
            answer: 2,
            explanation: "含Cu²⁺的溶液呈蓝色，如CuSO₄溶液"
          },
          {
            id: "ch_b_004",
            type: "choice",
            question: "下列金属活动性顺序正确的是？",
            options: ["Ag Zn Fe", "Fe Cu Zn", "Na Ca Mg", "Hg Ag Au"],
            answer: 2,
            explanation: "K Ca Na Mg Al Zn Fe Sn Pb (H) Cu Hg Ag Pt Au"
          },
          {
            id: "ch_b_005",
            type: "input",
            question: "填写化学方程式：2H₂O₂ —(MnO₂)→ ?",
            answer: "2H₂O + O₂↑",
            explanation: "过氧化氢在二氧化锰催化下分解为水和氧气"
          }
        ]
      },
      equations: {
        name: "化学方程式",
        questions: [
          {
            id: "ch_e_001",
            type: "choice",
            question: "实验室制取氧气的反应中，哪个需要加热？",
            options: ["2H₂O₂ → 2H₂O + O₂↑", "2KMnO₄ → K₂MnO₄ + MnO₂ + O₂↑", "2KClO₃ → 2KCl + 3O₂↑", "Zn + H₂SO₄ → ZnSO₄ + H₂↑"],
            answer: 1,
            explanation: "高锰酸钾制氧需要加热，催化剂和金属与酸反应不需要加热"
          },
          {
            id: "ch_e_002",
            type: "input",
            question: "实验室制取CO₂的化学方程式：CaCO₃ + ? → CaCl₂ + H₂O + CO₂↑",
            answer: "2HCl",
            explanation: "石灰石与稀盐酸反应生成氯化钙、水和二氧化碳"
          },
          {
            id: "ch_e_003",
            type: "choice",
            question: "铁与硫酸铜溶液反应的现象是？",
            options: [
              "铁表面产生气泡，溶液变浅绿色",
              "铁表面覆盖红色固体，溶液由蓝色变浅绿色",
              "铁溶解，溶液变蓝色",
              "无明显现象"
            ],
            answer: 1,
            explanation: "Fe + CuSO₄ → FeSO₄ + Cu，铁表面镀铜，溶液变色"
          },
          {
            id: "ch_e_004",
            type: "input",
            question: "氢氧化钠变质的化学方程式：2NaOH + CO₂ → ?",
            answer: "Na₂CO₃ + H₂O",
            explanation: "NaOH与空气中CO₂反应生成Na₂CO₃和H₂O"
          },
          {
            id: "ch_e_005",
            type: "choice",
            question: "下列方程式书写正确的是？",
            options: [
              "Mg + O₂ → MgO₂",
              "S + O₂ → SO₂↑",
              "2Fe + O₂ → 2FeO",
              "C + O₂ → CO₂"
            ],
            answer: 3,
            explanation: "C + O₂ → CO₂（点燃），其他要么化学式错，要么条件/符号漏写"
          }
        ]
      },
      experiments: {
        name: "实验技能",
        questions: [
          {
            id: "ch_ex_001",
            type: "choice",
            question: "收集CO₂的方法是？",
            options: ["排水法", "向上排空气法", "向下排空气法", "都可以"],
            answer: 1,
            explanation: "CO₂密度大于空气且能溶于水，只能用向上排空气法"
          },
          {
            id: "ch_ex_002",
            type: "choice",
            question: "检验氧气的方法是？",
            options: [
              "通入澄清石灰水",
              "用带火星的木条靠近",
              "用湿润的红色石蕊试纸",
              "加入AgNO₃溶液"
            ],
            answer: 1,
            explanation: "氧气能使带火星的木条复燃"
          },
          {
            id: "ch_ex_003",
            type: "choice",
            question: "实验室用双氧水制O₂，不需要用到的是？",
            options: ["试管", "分液漏斗", "酒精灯", "集气瓶"],
            answer: 2,
            explanation: "双氧水在MnO₂催化下分解，不需要加热"
          },
          {
            id: "ch_ex_004",
            type: "choice",
            question: "下列实验操作正确的是？",
            options: [
              "用嘴吹灭酒精灯",
              "把鼻孔凑近容器闻药品气味",
              "先撤导管后移酒精灯",
              "把水直接倒入浓硫酸中"
            ],
            answer: 2,
            explanation: "应先撤导管后移灯（防倒吸），其他都是危险操作"
          },
          {
            id: "ch_ex_005",
            type: "choice",
            question: "粗盐提纯的步骤顺序正确的是？",
            options: [
              "溶解→过滤→蒸发→加试剂",
              "溶解→加BaCl₂→过滤→加Na₂CO₃→加HCl→蒸发",
              "溶解→蒸发→过滤→加试剂",
              "溶解→加HCl→过滤→蒸发"
            ],
            answer: 1,
            explanation: "正确顺序：溶解→加BaCl₂（除SO₄²⁻）→过滤→加Na₂CO₃（除Ca²⁺/Mg²⁺）→加HCl（除过量碱）→蒸发"
          }
        ]
      },
      inference: {
        name: "推断题",
        questions: [
          {
            id: "ch_i_001",
            type: "choice",
            question: "某淡黄色粉末在空气中燃烧发出淡蓝色火焰，该粉末是？",
            options: ["Mg", "S", "P", "Fe"],
            answer: 1,
            explanation: "硫粉是淡黄色，在空气中燃烧发出淡蓝色火焰"
          },
          {
            id: "ch_i_002",
            type: "choice",
            question: "某蓝色溶液，加入NaOH溶液后产生蓝色沉淀，该溶液中含有？",
            options: ["Fe²⁺", "Fe³⁺", "Cu²⁺", "Mg²⁺"],
            answer: 2,
            explanation: "Cu²⁺与OH⁻生成蓝色Cu(OH)₂沉淀"
          },
          {
            id: "ch_i_003",
            type: "choice",
            question: "某无色气体能使澄清石灰水变浑浊，该气体是？",
            options: ["O₂", "N₂", "CO₂", "H₂"],
            answer: 2,
            explanation: "CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O，现象是浑浊"
          },
          {
            id: "ch_i_004",
            type: "choice",
            question: "CaCO₃高温分解的产物是？",
            options: ["CaO + CO", "CaO + CO₂", "Ca + CO₂", "Ca(OH)₂ + CO₂"],
            answer: 1,
            explanation: "CaCO₃高温→CaO + CO₂↑"
          },
          {
            id: "ch_i_005",
            type: "input",
            question: "三角关系CaO ⇌ CaCO₃ ⇌ Ca(OH)₂中，Ca(OH)₂ + CO₂ → ?",
            answer: "CaCO₃↓ + H₂O",
            explanation: "石灰水与CO₂反应生成碳酸钙沉淀和水"
          }
        ]
      },
      calculation: {
        name: "化学计算",
        questions: [
          {
            id: "ch_c_001",
            type: "choice",
            question: "H₂SO₄的相对分子质量是？",
            options: ["98", "96", "100", "102"],
            answer: 0,
            explanation: "Mr = 1×2 + 32 + 16×4 = 2+32+64 = 98"
          },
          {
            id: "ch_c_002",
            type: "choice",
            question: "NH₄NO₃中N元素的质量分数为？",
            options: ["17.5%", "28%", "35%", "40%"],
            answer: 2,
            explanation: "N% = (14×2)/(14+4+14+48) = 28/80 = 35%"
          },
          {
            id: "ch_c_003",
            type: "choice",
            question: "配制100g 10%的NaCl溶液，需要NaCl多少克？",
            options: ["5g", "10g", "15g", "20g"],
            answer: 1,
            explanation: "溶质质量 = 溶液质量 × 质量分数 = 100g × 10% = 10g"
          },
          {
            id: "ch_c_004",
            type: "choice",
            question: "用36g碳完全燃烧，可生成CO₂多少克？",
            options: ["44g", "88g", "132g", "66g"],
            answer: 2,
            explanation: "C + O₂ → CO₂，12:44 = 36:x，x = 132g"
          },
          {
            id: "ch_c_005",
            type: "input",
            question: "已知 Fe₂O₃中 Fe 质量分数为 70%，求 Fe₂O₃的相对分子质量（提示：56×2/ Mr = 0.7）",
            answer: "160",
            explanation: "56×2/Mr = 0.7 → Mr = 160，验证：Fe₂O₃ = 112+48=160"
          }
        ]
      }
    }
  },

  math: {
    name: "数学",
    icon: "📐",
    color: "#3b82f6",
    topics: {
      algebra: {
        name: "代数基础",
        questions: [
          {
            id: "ma_a_001",
            type: "choice",
            question: "化简：(a+b)² - (a-b)² = ?",
            options: ["2a²", "2b²", "4ab", "0"],
            answer: 2,
            explanation: "(a+b)²-(a-b)² = (a²+2ab+b²)-(a²-2ab+b²) = 4ab"
          },
          {
            id: "ma_a_002",
            type: "choice",
            question: "若方程x² - 5x + k = 0有两个相等的实根，则k = ?",
            options: ["25/4", "25/2", "4/25", "-25/4"],
            answer: 0,
            explanation: "Δ = 25 - 4k = 0 → k = 25/4"
          },
          {
            id: "ma_a_003",
            type: "input",
            question: "若一次函数y = kx + b经过(1,3)和(2,5)，则k = ?",
            answer: "2",
            explanation: "k = (5-3)/(2-1) = 2"
          },
          {
            id: "ma_a_004",
            type: "choice",
            question: "计算：√18 - √8 = ?",
            options: ["√10", "√2", "2√2", "0"],
            answer: 1,
            explanation: "√18 - √8 = 3√2 - 2√2 = √2"
          },
          {
            id: "ma_a_005",
            type: "choice",
            question: "不等式2x-1 > 3的解集是？",
            options: ["x > 1", "x > 2", "x < 1", "x < 2"],
            answer: 1,
            explanation: "2x > 4 → x > 2"
          }
        ]
      },
      geometry: {
        name: "几何",
        questions: [
          {
            id: "ma_g_001",
            type: "choice",
            question: "在直角三角形中，两直角边分别为3和4，则斜边为？",
            options: ["5", "7", "12", "25"],
            answer: 0,
            explanation: "勾股定理：3²+4²=9+16=25，c=5"
          },
          {
            id: "ma_g_002",
            type: "choice",
            question: "圆心角为60°的弧长为2π，则圆的半径为？",
            options: ["2", "3", "6", "12"],
            answer: 2,
            explanation: "L = nπr/180 → 2π = 60πr/180 → r = 6"
          },
          {
            id: "ma_g_003",
            type: "choice",
            question: "两个相似三角形的相似比为1:3，面积比为？",
            options: ["1:3", "1:6", "1:9", "3:1"],
            answer: 2,
            explanation: "相似比是1:3，面积比是相似比的平方，即1:9"
          },
          {
            id: "ma_g_004",
            type: "choice",
            question: "在三角形中，∠A=50°，∠B=60°，则∠C = ?",
            options: ["60°", "70°", "80°", "90°"],
            answer: 1,
            explanation: "三角形内角和180°，∠C = 180-50-60 = 70°"
          },
          {
            id: "ma_g_005",
            type: "input",
            question: "平行四边形相邻两边分别为5和7，夹角为60°，其面积为？",
            answer: "35√3/2",
            explanation: "S = a×b×sinθ = 5×7×sin60° = 35×√3/2"
          }
        ]
      },
      functions: {
        name: "函数",
        questions: [
          {
            id: "ma_f_001",
            type: "choice",
            question: "二次函数y = x² - 4x + 3的顶点坐标是？",
            options: ["(2, -1)", "(2, 1)", "(-2, -1)", "(-2, 1)"],
            answer: 0,
            explanation: "顶点x = -b/2a = 4/2 = 2，y = 4-8+3 = -1"
          },
          {
            id: "ma_f_002",
            type: "choice",
            question: "反比例函数y = k/x的图像经过点(2, 3)，则k = ?",
            options: ["5", "6", "1.5", "0.67"],
            answer: 1,
            explanation: "代入得3 = k/2 → k = 6"
          },
          {
            id: "ma_f_003",
            type: "choice",
            question: "二次函数y = -x² + 2x + 3的开口方向是？",
            options: ["向上", "向下", "不确定", "平行于x轴"],
            answer: 1,
            explanation: "二次项系数a = -1 < 0，所以开口向下"
          },
          {
            id: "ma_f_004",
            type: "choice",
            question: "一次函数y = -2x + 5，x=1时的函数值是？",
            options: ["3", "7", "-7", "5"],
            answer: 0,
            explanation: "y = -2×1 + 5 = 3"
          },
          {
            id: "ma_f_005",
            type: "input",
            question: "抛物线y = (x-3)² + 2的顶点坐标是？",
            answer: "(3, 2)",
            explanation: "顶点式y = a(x-h)² + k，顶点为(h, k) = (3, 2)"
          }
        ]
      },
      exam_questions: {
        name: "压轴题",
        questions: [
          {
            id: "ma_eq_001",
            type: "choice",
            question: "已知关于x的方程x² - 2mx + m² - 1 = 0有两个实根，则m的取值范围是？",
            options: ["m > 1", "m ≥ 1", "m为任意实数", "m ≥ -1"],
            answer: 2,
            explanation: "Δ = 4m² - 4(m²-1) = 4 > 0，恒成立，m为任意实数"
          },
          {
            id: "ma_eq_002",
            type: "choice",
            question: "动点P在边长为2的正方形ABCD的边上运动，PA = x，PA + PC的最小值为？",
            options: ["2√2", "4", "2√5", "2"],
            answer: 0,
            explanation: "当P在对角线交点时，PA+PC最小 = 对角线长 = 2√2"
          }
        ]
      }
    }
  },

  chinese: {
    name: "语文",
    icon: "📖",
    color: "#ef4444",
    topics: {
      ancient_poetry: {
        name: "古诗文",
        questions: [
          {
            id: "cn_s_001",
            type: "choice",
            question: "《岳阳楼记》中'先天下之忧而忧，后天下之乐而乐'表达了什么情感？",
            options: ["思乡之情", "爱国忧民", "离愁别绪", "山水之乐"],
            answer: 1,
            explanation: "这句话表达了范仲淹以天下为己任的爱国忧民情怀"
          },
          {
            id: "cn_s_002",
            type: "choice",
            question: "下列诗句中使用了借代修辞的是？",
            options: [
              "烽火连三月，家书抵万金",
              "明月松间照，清泉石上流",
              "春蚕到死丝方尽，蜡炬成灰泪始干",
              "大漠孤烟直，长河落日圆"
            ],
            answer: 0,
            explanation: "'烽火'借代战争，'家书'借代书信，是借代手法"
          },
          {
            id: "cn_s_003",
            type: "input",
            question: "《出师表》中'受任于败军之际，奉命于危难之间'说的是谁？",
            answer: "诸葛亮",
            explanation: "诸葛亮在刘备兵败后接受托孤重任"
          },
          {
            id: "cn_s_004",
            type: "choice",
            question: "下列作家与作品对应错误的是？",
            options: [
              "杜甫《茅屋为秋风所破歌》",
              "苏轼《水调歌头》",
              "李白《爱莲说》",
              "王勃《送杜少府之任蜀州》"
            ],
            answer: 2,
            explanation: "《爱莲说》的作者是周敦颐，不是李白"
          },
          {
            id: "cn_s_005",
            type: "input",
            question: "补全诗句：但愿人长久，千里共___",
            answer: "婵娟",
            explanation: "出自苏轼《水调歌头·明月几时有》"
          }
        ]
      },
      writing: {
        name: "作文技巧",
        questions: [
          {
            id: "cn_w_001",
            type: "choice",
            question: "中考作文评分标准中，最重要的两项是？",
            options: [
              "字数和书写",
              "立意和语言",
              "开头和结尾",
              "修辞和引用"
            ],
            answer: 1,
            explanation: "立意深刻是作文的灵魂，语言优美是得高分的关键"
          },
          {
            id: "cn_w_002",
            type: "choice",
            question: "写记叙文时，'细节描写'的作用是？",
            options: [
              "凑字数",
              "使文章更生动具体",
              "显得文笔好",
              "没有实际作用"
            ],
            answer: 1,
            explanation: "细节描写能让文章更生动，使读者有画面感"
          }
        ]
      }
    }
  },

  english: {
    name: "英语",
    icon: "🔤",
    color: "#8b5cf6",
    topics: {
      grammar: {
        name: "语法",
        questions: [
          {
            id: "en_g_001",
            type: "choice",
            question: "The boy ___ the window just now. (break)",
            options: ["breaks", "broke", "has broken", "will break"],
            answer: 1,
            explanation: "just now表示过去，用一般过去时broke"
          },
          {
            id: "en_g_002",
            type: "choice",
            question: "Which sentence is correct?",
            options: [
              "He asked me that where I lived",
              "He asked me where did I live",
              "He asked me where I lived",
              "He asked me where I live"
            ],
            answer: 2,
            explanation: "宾语从句用陈述语序，主句过去时从句相应过去时"
          },
          {
            id: "en_g_003",
            type: "choice",
            question: "___ the windows before you leave. (not forget)",
            options: [
              "Don't forget to clean",
              "Don't forget cleaning",
              "Not forget to clean",
              "Don't forget clean"
            ],
            answer: 0,
            explanation: "forget to do表示忘记要做的事，否定用don't forget to do"
          },
          {
            id: "en_g_004",
            type: "input",
            question: "If I ___ (be) a bird, I would fly to the sky.",
            answer: "were",
            explanation: "虚拟语气中，if I/we were表示与现在事实相反的假设"
          },
          {
            id: "en_g_005",
            type: "choice",
            question: "The book ___ by millions of people. (translate)",
            options: [
              "is translated",
              "has translated",
              "translates",
              "translated"
            ],
            answer: 0,
            explanation: "book与translate是被动关系，用被动语态be + done"
          }
        ]
      },
      vocabulary: {
        name: "词汇",
        questions: [
          {
            id: "en_v_001",
            type: "choice",
            question: "The of the book is very interesting.",
            options: ["content", "contents", "context", "contest"],
            answer: 1,
            explanation: "contents表示目录 contents，content表示内容本身"
          },
          {
            id: "en_v_002",
            type: "choice",
            question: "He is very ___ about the result of the exam.",
            options: ["anxious", "eager", "worried", "nervous"],
            answer: 0,
            explanation: "be anxious about表示对...感到焦虑/担忧"
          }
        ]
      }
    }
  },

  physics: {
    name: "物理",
    icon: "⚡",
    color: "#f59e0b",
    topics: {
      mechanics: {
        name: "力学",
        questions: [
          {
            id: "ph_m_001",
            type: "choice",
            question: "一个物体的质量为2kg，受到重力为多少N？（g=10N/kg）",
            options: ["2N", "5N", "20N", "0.2N"],
            answer: 2,
            explanation: "G = mg = 2kg × 10N/kg = 20N"
          },
          {
            id: "ph_m_002",
            type: "choice",
            question: "物体在平衡力作用下将？",
            options: [
              "做加速运动",
              "保持静止或匀速直线运动",
              "做曲线运动",
              "停止运动"
            ],
            answer: 1,
            explanation: "牛顿第一定律：物体在平衡力下保持静止或匀速直线运动"
          },
          {
            id: "ph_m_003",
            type: "choice",
            question: "压强公式P=F/S中，F和S分别代表？",
            options: [
              "压力，受力面积",
              "重力，受力面积",
              "压力，接触面积",
              "重力，接触面积"
            ],
            answer: 0,
            explanation: "压强F是压力（不是重力），S是受力面积"
          },
          {
            id: "ph_m_004",
            type: "choice",
            question: "物体的动能与什么因素有关？",
            options: [
              "只有质量",
              "只有速度",
              "质量和速度",
              "质量和高度"
            ],
            answer: 2,
            explanation: "动能Ek = ½mv²，与质量和速度都有关"
          },
          {
            id: "ph_m_005",
            type: "input",
            question: "物体以2m/s的速度匀速行驶10s，通过的路程是___m",
            answer: "20",
            explanation: "s = vt = 2m/s × 10s = 20m"
          }
        ]
      },
      electricity: {
        name: "电学",
        questions: [
          {
            id: "ph_e_001",
            type: "choice",
            question: "欧姆定律的公式是？",
            options: ["R = U/I", "U = IR", "I = U/R", "以上都是"],
            answer: 3,
            explanation: "欧姆定律三个变形公式都正确，可相互推导"
          },
          {
            id: "ph_e_002",
            type: "choice",
            question: "两个电阻R₁=4Ω，R₂=6Ω并联，总电阻为？",
            options: ["10Ω", "2.4Ω", "24Ω", "5Ω"],
            answer: 1,
            explanation: "并联1/R = 1/4 + 1/6 = 5/12，R = 12/5 = 2.4Ω"
          },
          {
            id: "ph_e_003",
            type: "choice",
            question: "电功率公式P=UI可以推导为？",
            options: ["P = I²R", "P = U²/R", "两者都可以", "两者都不对"],
            answer: 2,
            explanation: "P=UI代入U=IR得P=I²R，代入I=U/R得P=U²/R"
          },
          {
            id: "ph_e_004",
            type: "choice",
            question: "家庭电路中，哪个说法正确？",
            options: [
              "可以用铜丝代替保险丝",
              "保险丝应与零线相连",
              "人站在绝缘体上触摸火线不会触电",
              "三脚插头的接地脚应连接用电器外壳"
            ],
            answer: 3,
            explanation: "三脚插头的接地脚连接外壳，防止外壳带电触电"
          },
          {
            id: "ph_e_005",
            type: "input",
            question: "一段导体两端电压为6V，通过电流为0.5A，导体的电阻为___Ω",
            answer: "12",
            explanation: "R = U/I = 6V / 0.5A = 12Ω"
          }
        ]
      }
    }
  },

  politics: {
    name: "道法",
    icon: "⚖️",
    color: "#6366f1",
    topics: {
      basics: {
        name: "道德与法治基础",
        questions: [
          {
            id: "po_b_001",
            type: "choice",
            question: "公民的基本义务包括？",
            options: [
              "只包括依法纳税",
              "只包括服兵役",
              "包括维护国家利益、依法纳税、服兵役等",
              "只有遵守宪法和法律"
            ],
            answer: 2,
            explanation: "公民基本义务包括维护国家利益、依法纳税、服兵役、遵守宪法法律等"
          },
          {
            id: "po_b_002",
            type: "choice",
            question: "公民行使监督权的合法途径是？",
            options: [
              "聚众闹事",
              "在网上随意发帖",
              "通过人大代表、政协委员、政务热线等",
              "拦截政府车辆"
            ],
            answer: 2,
            explanation: "公民应通过正当渠道行使监督权，如人大代表、热线电话等"
          },
          {
            id: "po_b_003",
            type: "choice",
            question: "'法治'的核心是？",
            options: [
              "依法治国",
              "宪法至上",
              "良法之治",
              "法律面前人人平等"
            ],
            answer: 1,
            explanation: "宪法是法治的核心，一切法律都不能与宪法相违背"
          },
          {
            id: "po_b_004",
            type: "choice",
            question: "社会主义核心价值观在个人层面的内容是？",
            options: [
              "富强、民主、文明、和谐",
              "自由、平等、公正、法治",
              "爱国、敬业、诚信、友善",
              "公正、诚信、友善、和谐"
            ],
            answer: 2,
            explanation: "社会主义核心价值观：国家→富强民主文明和谐，社会→自由平等公正法治，个人→爱国敬业诚信友善"
          },
          {
            id: "po_b_005",
            type: "input",
            question: "全面依法治国的总目标是建设___法治体系，建设社会主义法治国家",
            answer: "中国特色社会主义",
            explanation: "全面依法治国的总目标：建设中国特色社会主义法治体系"
          }
        ]
      }
    }
  },

  history: {
    name: "历史",
    icon: "📜",
    color: "#84cc16",
    topics: {
      timeline: {
        name: "时间轴",
        questions: [
          {
            id: "hi_t_001",
            type: "choice",
            question: "鸦片战争爆发于哪一年？",
            options: ["1839年", "1840年", "1842年", "1856年"],
            answer: 1,
            explanation: "1840年，英国以林则徐虎门销烟为借口发动侵略战争"
          },
          {
            id: "hi_t_002",
            type: "choice",
            question: "辛亥革命发生在？",
            options: ["1911年", "1919年", "1921年", "1915年"],
            answer: 0,
            explanation: "1911年10月10日武昌起义标志着辛亥革命开始"
          },
          {
            id: "hi_t_003",
            type: "choice",
            question: "抗日战争的起点事件是？",
            options: [
              "七七事变",
              "九一八事变",
              "西安事变",
              "八一三事变"
            ],
            answer: 1,
            explanation: "1931年九一八事变是抗日战争的起点"
          },
          {
            id: "hi_t_004",
            type: "choice",
            question: "新中国的成立时间是？",
            options: ["1945年10月1日", "1949年10月1日", "1949年7月1日", "1946年10月1日"],
            answer: 1,
            explanation: "1949年10月1日，毛泽东在天安门城楼宣布新中国成立"
          },
          {
            id: "hi_t_005",
            type: "input",
            question: "戊戌变法发生在___年",
            answer: "1898",
            explanation: "1898年，光绪帝颁布一系列变法诏令，史称戊戌变法或百日维新"
          }
        ]
      },
      important_events: {
        name: "重要事件",
        questions: [
          {
            id: "hi_e_001",
            type: "choice",
            question: "五四运动的直接导火索是？",
            options: [
              "巴黎和会上中国外交失败",
              "袁世凯签订二十一条",
              "新文化运动的开展",
              "俄国十月革命的影响"
            ],
            answer: 0,
            explanation: "1919年巴黎和会拒绝中国正当要求，成为五四运动导火索"
          },
          {
            id: "hi_e_002",
            type: "choice",
            question: "改革开放是哪一年开始的？",
            options: ["1976年", "1978年", "1980年", "1982年"],
            answer: 1,
            explanation: "1978年党的十一届三中全会开启改革开放新时期"
          }
        ]
      }
    }
  }
};

// 导出题库
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QUESTION_BANK;
}
