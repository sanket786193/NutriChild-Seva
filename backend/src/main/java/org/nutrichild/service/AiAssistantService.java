package org.nutrichild.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AiAssistantService {

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    @Value("${gemini.api.url:https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent}")
    private String geminiApiUrl;

    private static final String MEDICAL_DISCLAIMER = 
        "⚠️ Important: This advice is for nutritional guidance and health education aligned with WHO and POSHAN Abhiyaan standards. It does not replace medical diagnosis or clinical treatment by a doctor or ASHA worker.";

    public Map<String, Object> askAssistant(String question, String language, String childContext) {
        String lowerQ = question.toLowerCase();
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("language", language);
        response.put("disclaimer", MEDICAL_DISCLAIMER);

        String answer;
        List<String> suggestedActions = new ArrayList<>();

        if (lowerQ.contains("khichdi") || lowerQ.contains("wean") || lowerQ.contains("feed") || lowerQ.contains("start food") || lowerQ.contains("khana")) {
            answer = "For infants 6 months and older, complementary feeding should start with semi-solid, nutrient-dense foods. Make thick khichdi with broken rice and moong dal, adding 1 teaspoon of desi ghee or mustard oil for calorie density. Introduce mashed green leaves (moringa/spinach) and mashed papaya or banana. Never dilute with excess water.";
            suggestedActions.add("Feed 3-4 small bowls daily");
            suggestedActions.add("Add 1 boiled egg yolk after 8 months");
            suggestedActions.add("Collect Anganwadi Take-Home Ration (THR) mix");
        } else if (lowerQ.contains("anemia") || lowerQ.contains("iron") || lowerQ.contains("pale") || lowerQ.contains("khoon")) {
            answer = "Anemia occurs when hemoglobin drops below 11.0 g/dL. To treat and prevent anemia: 1) Administer Iron-Folic Acid (IFA) syrup provided free by your ASHA worker weekly. 2) Cook food in cast iron utensils (lohe ki kadhai). 3) Feed drumstick leaves, spinach, roasted chana with jaggery (gud), and lemon/citrus fruits rich in Vitamin C to boost iron absorption.";
            suggestedActions.add("Request ASHA for weekly IFA syrup bottle");
            suggestedActions.add("Give roasted chana with jaggery as snack");
            suggestedActions.add("Avoid giving tea or coffee to children");
        } else if (lowerQ.contains("fever") || lowerQ.contains("bukhar") || lowerQ.contains("tap")) {
            answer = "If the child has fever: 1) Continue regular breastfeeding and offer clean boiled water or ORS to prevent dehydration. 2) Sponge the child's forehead, neck, and arms with lukewarm tap water (do NOT use cold ice water). 3) If fever persists over 24 hours, or is accompanied by convulsions, lethargy, or refusal to drink, visit the nearest Primary Health Centre (PHC) immediately.";
            suggestedActions.add("Check temperature with thermometer");
            suggestedActions.add("Continue breastfeeding frequently");
            suggestedActions.add("Call 108 / 102 ambulance if child is unconscious");
        } else if (lowerQ.contains("diarrhea") || lowerQ.contains("dast") || lowerQ.contains("loose")) {
            answer = "Immediate management of diarrhea requires ORS (Oral Rehydration Salts) and Zinc tablets: 1) Mix 1 full packet of ORS in 1 liter of clean drinking water and give after each loose stool. 2) Administer Zinc tablet (20mg daily for 14 days) from Anganwadi to heal the gut lining. 3) Never stop feeding or breastfeeding.";
            suggestedActions.add("Give Zinc tablet daily for 14 full days");
            suggestedActions.add("Give sips of ORS after every bowel movement");
            suggestedActions.add("Seek urgent care if stool contains blood");
        } else if (lowerQ.contains("vaccin") || lowerQ.contains("tika") || lowerQ.contains("injection")) {
            answer = "Vaccinations protect your child from deadly illnesses like tuberculosis, polio, rotavirus diarrhea, pneumonia, and measles. If any vaccine was missed, it can still be caught up! Check the child's QR Health Card or visit your village Anganwadi center during Village Health Sanitation and Nutrition Day (VHSND).";
            suggestedActions.add("View overdue vaccine list in NutriChild+");
            suggestedActions.add("Visit next Wednesday Anganwadi vaccination session");
        } else {
            answer = "NutriChild+ recommends balanced nutrition based on Indian grains: Ragi, Jowar, Bajra, lentils (dal), eggs, and dark green leaves like Moringa. Clean drinking water, handwashing before meals, and timely vaccinations prevent up to 80% of childhood stunting and infections.";
            suggestedActions.add("Record child's monthly weight & height");
            suggestedActions.add("Check eligibility for Poshan 2.0 schemes");
        }

        response.put("answer", answer);
        response.put("suggestedActions", suggestedActions);
        return response;
    }

    public Map<String, Object> analyzeFoodPlate(String foodName, String description) {
        Map<String, Object> analysis = new LinkedHashMap<>();
        analysis.put("foodAnalyzed", foodName != null ? foodName : "Mixed Indian Meal");
        analysis.put("disclaimer", MEDICAL_DISCLAIMER);

        String desc = (foodName + " " + (description != null ? description : "")).toLowerCase();

        int estCalories = 280;
        double estProtein = 7.5;
        List<String> nutrients = new ArrayList<>();
        List<String> recommendations = new ArrayList<>();
        String rating = "BALANCED";

        if (desc.contains("khichdi") || desc.contains("dal")) {
            estCalories = 320;
            estProtein = 9.0;
            nutrients.add("Carbohydrates (Rice/Millets)");
            nutrients.add("Plant Protein (Lentils)");
            nutrients.add("Fiber");
            if (desc.contains("ghee") || desc.contains("oil")) {
                estCalories += 50;
                nutrients.add("Essential Fatty Acids");
            } else {
                recommendations.add("Add 1 teaspoon of ghee or oil to increase calorie density for growing child.");
            }
        }

        if (desc.contains("egg") || desc.contains("anda")) {
            estCalories += 75;
            estProtein += 6.5;
            nutrients.add("High Biological Value Protein");
            nutrients.add("Choline & Vitamin B12");
            nutrients.add("Vitamin A");
        }

        if (desc.contains("moringa") || desc.contains("drumstick") || desc.contains("palak") || desc.contains("spinach") || desc.contains("saag")) {
            nutrients.add("Non-heme Iron");
            nutrients.add("Beta-carotene (Vitamin A)");
            nutrients.add("Folate");
        } else {
            recommendations.add("Add chopped green leaves (drumstick/palak) to improve iron and Vitamin A content.");
        }

        if (desc.contains("ragi") || desc.contains("mandia") || desc.contains("nachni")) {
            estCalories += 100;
            estProtein += 3.0;
            nutrients.add("High Dietary Calcium (Bone growth)");
            nutrients.add("Iron");
        }

        analysis.put("estimatedCaloriesKcal", estCalories);
        analysis.put("estimatedProteinGrams", Math.round(estProtein * 10.0) / 10.0);
        analysis.put("keyNutrientsPresent", nutrients.isEmpty() ? List.of("Carbohydrates", "Energy") : nutrients);
        analysis.put("dietaryImprovements", recommendations.isEmpty() ? List.of("Plate is well-balanced for childhood growth!") : recommendations);
        analysis.put("plateRating", rating);

        return analysis;
    }
}
