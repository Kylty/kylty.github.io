library(psych)
data(bfi)
?bfi          # 查看官方說明文件，了解每個欄位的意義
str(bfi)      # 看資料結構

library(psych)
library(dplyr)
data(bfi)

bfi |>
  select(C1:C5, gender, age, education) |>
  summarise(across(everything(), ~sum(is.na(.))))

bfi |>
  mutate(missing_c = if_any(c(C1, C2, C3, C4, C5), is.na)) |>
  group_by(missing_c) |>
  summarise(
    n        = n(),
    mean_age = mean(age),
    std_age = sd(age),
    .groups  = "drop"
  )

bfi_clean <- bfi |>
  filter(!if_any(c(C1, C2, C3, C4, C5), is.na))

hist(bfi_clean$age,
     breaks=100, freq=TRUE,
     main="C年齡分布",
     xlab="age",
     col="#AED6F1", border="white")

bfi_clean <- bfi_clean |>
  filter(age >= 11)
nrow(bfi_clean)

bfi_clean <- bfi_clean |>
  mutate(
    C4r = 7 - C4,
    C5r = 7 - C5,
    conscientiousness = (C1 + C2 + C3 + C4r + C5r) / 5
  )

summary(bfi_clean$conscientiousness) 

bfi_clean <- bfi_clean |>
  mutate(gender = factor(gender, levels = c(1, 2), labels = c("男", "女")))

summary(bfi_clean$conscientiousness)

nrow(bfi_clean) 

bfi_clean |>
  group_by(gender) |>
  summarise(
    n          = n(),
    mean_c   = mean(conscientiousness),
    sd_c     = sd(conscientiousness),
    median_c = median(conscientiousness),
    .groups    = "drop"
  )

bfi_clean <- bfi_clean |>
mutate(
  age_group = case_when(
    age <= 17 ~ "青少年",
    age <= 25 ~ "成年初顯期",
    age <= 39 ~ "成年期",
    TRUE      ~ "中年期"
  )
)
bfi_clean |>
  group_by(age_group) |>
  summarise(
    n          = n(),
    mean   = mean(conscientiousness),
    sd     = sd(conscientiousness),
    median = median(conscientiousness),
    .groups    = "drop"
  )
bfi_clean$age_group <- factor(bfi_clean$age_group, 
                              levels = c("青少年", "成年初顯期", "成年期", "中年期"))

library(ggplot2)
ggplot(bfi_clean, aes(x=age_group, y=conscientiousness, fill=age_group)) +
  geom_boxplot(alpha=0.7, width=0.5) +
  geom_jitter(width=0.1, alpha=0.4, size=0.1) +
  stat_summary(fun = mean, geom = "line", aes(group = 1), linewidth = 0.8, color = 'red') +
  labs(title="C分數比較",
       x="組別", y="C分數") +
  theme_minimal() +
  theme(legend.position="none")

ggplot(bfi_clean, aes(x = age, y = conscientiousness, color = gender)) +
  geom_smooth(method = "loess") +
  labs(title = "男女年齡C分數比較", x = "年齡", y = "C值", color = "") +
  theme_minimal()

bfi_clean |>
  filter(age >= 80) |>
  group_by(gender) |>
  summarise(n = n())

library(tidyr)

bfi_long <- bfi_clean |>
  select(id = 1, age_group, C1, C2, C3, C4r, C5r) |>
  pivot_longer(cols = C1:C5r, names_to = "item", values_to = "score")
head(bfi_long, 10) 

bfi_long$age_group <- factor(bfi_long$age_group, 
                              levels = c("青少年", "成年初顯期", "成年期", "中年期"))
bfi_long |>
  group_by(item,age_group) |>
  summarise(
    mean = mean(score),
    .groups    = "drop"
  )

item_summary <- bfi_long |>
  group_by(age_group, item) |>
  summarise(mean = mean(score), .groups = "drop")

ggplot(item_summary, aes(x = age_group, y = mean, color = item, group = item)) +
  geom_line(linewidth = 0.8) +
  geom_point(size = 2) +
  labs(title = "不同年齡組各題C分數平均", x = "年齡組", y = "分數", color = "題目") +
  theme_minimal()
