import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import requests
import json
from collections import Counter
import warnings
warnings.filterwarnings('ignore')

# Set up plotting style
plt.style.use('default')
sns.set_palette("husl")

# Fetch the data
url = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/karachi_crime_rate_with_demographics-uawBcJwDvZR1w1A0jOqQyEn9XUgiR2.csv"
response = requests.get(url)
with open('karachi_crime_data.csv', 'wb') as f:
    f.write(response.content)

# Load and examine the data
df = pd.read_csv('karachi_crime_data.csv')

print("=== KARACHI CRIME DATA ANALYSIS ===")
print(f"Dataset Shape: {df.shape}")
print(f"Date Range: {df['Month'].min()} to {df['Month'].max()}")

# Data Overview
print("\n=== DATA OVERVIEW ===")
print(df.info())
print("\nFirst 5 rows:")
print(df.head())

# Data Cleaning
print("\n=== DATA CLEANING ===")
# Convert Month to datetime
df['Month'] = pd.to_datetime(df['Month'])
df['Crime Count'] = pd.to_numeric(df['Crime Count'], errors='coerce')

# Handle missing values
print("Missing values per column:")
print(df.isnull().sum())

# Replace 'Unknown' with NaN for better analysis
columns_to_clean = ['Suspect_Age', 'Suspect_Gender', 'Occupation', 'Education_Level', 'Crime_Motive', 'Reference_Source']
for col in columns_to_clean:
    df[col] = df[col].replace('Unknown', np.nan)

print(f"\nAfter cleaning - Dataset Shape: {df.shape}")

# Basic Statistics
print("\n=== DESCRIPTIVE STATISTICS ===")
print(f"Total Crime Incidents: {df['Crime Count'].sum():,}")
print(f"Average Monthly Crimes: {df.groupby('Month')['Crime Count'].sum().mean():.1f}")
print(f"Number of Areas: {df['Karachi Area'].nunique()}")
print(f"Number of Crime Types: {df['Crm Cd Desc'].nunique()}")

# Time Series Analysis
print("\n=== TIME SERIES ANALYSIS ===")
monthly_crimes = df.groupby('Month')['Crime Count'].sum().reset_index()
print("Monthly Crime Trends:")
print(monthly_crimes.tail(10))

# Geographic Analysis
print("\n=== GEOGRAPHIC ANALYSIS ===")
area_crimes = df.groupby('Karachi Area')['Crime Count'].sum().sort_values(ascending=False)
print("Top 10 High-Crime Areas:")
print(area_crimes.head(10))

# Crime Type Analysis
print("\n=== CRIME TYPE ANALYSIS ===")
crime_types = df.groupby('Crm Cd Desc')['Crime Count'].sum().sort_values(ascending=False)
print("Top 10 Crime Types:")
print(crime_types.head(10))

# Demographic Analysis
print("\n=== DEMOGRAPHIC ANALYSIS ===")
print("Gender Distribution:")
gender_dist = df['Suspect_Gender'].value_counts(dropna=False)
print(gender_dist)

print("\nAge Distribution:")
age_dist = df['Suspect_Age'].value_counts(dropna=False)
print(age_dist.head(10))

print("\nEducation Level Distribution:")
edu_dist = df['Education_Level'].value_counts(dropna=False)
print(edu_dist)

# Crime Motive Analysis
print("\n=== CRIME MOTIVE ANALYSIS ===")
motive_dist = df['Crime_Motive'].value_counts(dropna=False)
print("Top Crime Motives:")
print(motive_dist.head(10))

# Seasonal Analysis
print("\n=== SEASONAL ANALYSIS ===")
df['Year'] = df['Month'].dt.year
df['Month_Name'] = df['Month'].dt.month_name()
seasonal_crimes = df.groupby('Month_Name')['Crime Count'].sum().sort_values(ascending=False)
print("Crimes by Month:")
print(seasonal_crimes)

# Area-wise Crime Type Analysis
print("\n=== AREA-WISE CRIME TYPE ANALYSIS ===")
area_crime_matrix = df.pivot_table(values='Crime Count', index='Karachi Area', columns='Crm Cd Desc', aggfunc='sum', fill_value=0)
print(f"Crime matrix shape: {area_crime_matrix.shape}")

# Generate insights for dashboard
insights = {
    "total_crimes": int(df['Crime Count'].sum()),
    "total_areas": int(df['Karachi Area'].nunique()),
    "total_crime_types": int(df['Crm Cd Desc'].nunique()),
    "avg_monthly_crimes": float(df.groupby('Month')['Crime Count'].sum().mean()),
    "peak_crime_month": seasonal_crimes.index[0],
    "highest_crime_area": area_crimes.index[0],
    "most_common_crime": crime_types.index[0],
    "data_completeness": float((df.notna().sum().sum() / (df.shape[0] * df.shape[1])) * 100)
}

# Save processed data and insights
monthly_crimes.to_csv('monthly_crimes.csv', index=False)
area_crimes.to_csv('area_crimes.csv')
crime_types.to_csv('crime_types.csv')
seasonal_crimes.to_csv('seasonal_crimes.csv')

# Save insights as JSON
with open('insights.json', 'w') as f:
    json.dump(insights, f, indent=2)

print("\n=== KEY INSIGHTS GENERATED ===")
print(f"✓ Total Crimes Analyzed: {insights['total_crimes']:,}")
print(f"✓ Peak Crime Month: {insights['peak_crime_month']}")
print(f"✓ Highest Crime Area: {insights['highest_crime_area']}")
print(f"✓ Most Common Crime: {insights['most_common_crime']}")
print(f"✓ Data Completeness: {insights['data_completeness']:.1f}%")

print("\n=== ANALYSIS COMPLETE ===")
print("Data processed and ready for dashboard visualization!")
