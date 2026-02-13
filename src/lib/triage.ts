export type TriageQuestion = {
    id: string
    text: string
    isRedFlag: boolean // If true, answering "Yes" triggers a red flag
}

export const triageQuestions: TriageQuestion[] = [
    {
        id: "chest_pain",
        text: "Are you currently experiencing severe chest pain or difficulty breathing?",
        isRedFlag: true,
    },
    {
        id: "loss_consciousness",
        text: "Have you had any recent loss of consciousness or fainting spells?",
        isRedFlag: true,
    },
    {
        id: "bladder_bowel",
        text: "Have you noticed any sudden changes in bladder or bowel control (incontinence or retention)?",
        isRedFlag: true,
    },
    {
        id: "saddle_anesthesia",
        text: "Do you have numbness in the groin or inner thigh area (saddle anesthesia)?",
        isRedFlag: true,
    },
    {
        id: "night_pain",
        text: "Do you have pain that wakes you up at night and does not improve with rest?",
        isRedFlag: true, // Potential cancer/infection flag, usually requires medical consult
    },
    {
        id: "trauma",
        text: "Is your pain the result of a significant recent trauma (fall, accident)?",
        isRedFlag: true, // Potential fracture
    },
]
