package org.nutrichild.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class NutritionPlannerService {

    public Map<String, Object> getNutritionPlan(int ageMonths, String riskCategory, String gender) {
        Map<String, Object> plan = new LinkedHashMap<>();
        plan.put("ageMonths", ageMonths);
        plan.put("riskCategory", riskCategory);

        if (ageMonths < 6) {
            plan.put("title", "Exclusive Breastfeeding (0-6 Months)");
            plan.put("dailyCalories", "500-600 kcal from breast milk");
            plan.put("dailyProtein", "9.1 g/day");
            plan.put("feedingFrequency", "On demand (at least 8 to 12 times in 24 hours)");
            plan.put("guidelines", List.of(
                "Do NOT give plain water, animal milk, honey, or ghutti before 6 completed months.",
                "Colostrum (first golden breast milk) must be fed - it acts as the child's first natural vaccine.",
                "Mother should consume extra drumstick (moringa) leaves, lentils, and ragi for milk production."
            ));
            plan.put("localFoods", List.of("Mother's Milk", "Mother's Diet: Ragi Ganji", "Mother's Diet: Drumstick Leaf Curry"));
        } else if (ageMonths < 12) {
            plan.put("title", "Complementary Feeding & Breastfeeding (6-12 Months)");
            plan.put("dailyCalories", "650-750 kcal/day");
            plan.put("dailyProtein", "11 g/day");
            plan.put("feedingFrequency", "Breastfeed + 3 to 4 semi-solid meals daily");
            plan.put("guidelines", List.of(
                "Start with well-mashed thick khichdi with 1 teaspoon desi ghee or mustard oil.",
                "Feed mashed ripe banana, boiled and mashed sweet potato, or mashed boiled dal.",
                "Introduce finger millet (ragi) porridge cooked with water/breastmilk and a pinch of jaggery.",
                "Anganwadi Take-Home Ration (THR) halwa/ladoo mix twice daily."
            ));
            plan.put("localFoods", List.of(
                "Mashed Moong Dal Khichdi with Ghee",
                "Ragi (Mandia/Nachni) Porridge",
                "Mashed Papaya and Banana",
                "Boiled Egg Yolk (from 8 months)",
                "Anganwadi THR (Bal-Aahar)"
            ));
        } else if (ageMonths <= 36) {
            plan.put("title", "Toddler Active Nutrition (1-3 Years)");
            plan.put("dailyCalories", "1000-1100 kcal/day");
            plan.put("dailyProtein", "13 g/day");
            plan.put("feedingFrequency", "3 family meals + 2 nutritious mid-day snacks");
            plan.put("guidelines", List.of(
                "Feed nutrient-rich local grains: Jowar, Bajra, and Ragi rotis softened with dal.",
                "Add 1 boiled egg daily or a bowl of sprouted moong/chana if vegetarian.",
                "Include dark green leafy vegetables (Moringa/Palak/Bathua) cooked with oil for Vitamin A absorption.",
                "Ensure child washes hands with soap before touching food."
            ));
            plan.put("localFoods", List.of(
                "Ragi Roti / Bajra Bhakri with Dal",
                "Boiled Whole Egg",
                "Drumstick Leaf Dal / Moringa Soup",
                "Sprouted Gram Sundal",
                "Seasonal Guava, Mango, or Papaya",
                "Anganwadi Hot Cooked Meal"
            ));
        } else {
            plan.put("title", "Growing Child Nutrition (3-6 Years)");
            plan.put("dailyCalories", "1250-1400 kcal/day");
            plan.put("dailyProtein", "16 g/day");
            plan.put("feedingFrequency", "3 full meals + 2 snacks daily");
            plan.put("guidelines", List.of(
                "Active Anganwadi participation for daily fortified hot cooked meal.",
                "Iron-rich foods: Green leafy vegetables, jaggery (gud) with roasted chana for anemia prevention.",
                "Ensure biannual Vitamin A supplementation and albendazole deworming."
            ));
            plan.put("localFoods", List.of(
                "Dal Khichdi enriched with vegetables & peanuts",
                "Egg Bhurji or Paneer",
                "Roasted Gram with Jaggery (Chana-Gud)",
                "Curd / Chaas (Buttermilk)",
                "Mixed Vegetable Pulao"
            ));
        }

        // Special Malnutrition Interventions
        if ("RED".equals(riskCategory)) {
            plan.put("emergencyAlert", "CRITICAL SAM INTERVENTION: Child requires Medical Officer assessment. Administer Ready-to-Use Therapeutic Food (RUTF) under clinical guidance. Double Take-Home Ration (THR).");
            plan.put("supplements", List.of("Therapeutic RUTF paste", "Amoxicillin course (if prescribed by doctor)", "IFA Syrup (after stabilization)"));
        } else if ("ORANGE".equals(riskCategory)) {
            plan.put("specialAlert", "MAM INTERVENTION: Add 1 extra snack and 1 teaspoon oil/ghee to every meal to boost calorie density. Anganwadi double nutrition support.");
            plan.put("supplements", List.of("Weekly IFA Syrup (Iron + Folic Acid)", "Anganwadi Energy Dense Nutrition Paste (EDNP)"));
        } else if ("YELLOW".equals(riskCategory)) {
            plan.put("specialAlert", "MILD DEFICIENCY: Ensure daily intake of green leafy vegetables and seasonal fruits rich in Vitamin C for iron absorption.");
            plan.put("supplements", List.of("Bi-weekly Iron-Folic Acid (IFA) syrup (1ml as per Poshan guidelines)"));
        } else {
            plan.put("supplements", List.of("Routine prophylactic IFA syrup and biannual Vitamin A"));
        }

        return plan;
    }
}
