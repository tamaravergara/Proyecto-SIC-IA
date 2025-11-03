# Sistema de Análisis de Comportamiento y Reconocimiento de Acciones

## 📋 Descripción
Sistema de visión computacional para interpretar semánticamente las interacciones entre individuos en tiempo real o en grabaciones de video.

## 🎯 Objetivo General
Desarrollar un sistema de análisis de comportamiento y reconocimiento de acciones mediante visión computacional, capaz de interpretar semánticamente las interacciones entre individuos en tiempo real o en grabaciones de video.

El sistema no solo detecta y rastrea a las personas, sino que logra clasificar sus interacciones y asignar roles lógicos a los participantes del evento.

## 🎯 Objetivos Específicos

### 1. Detección y Seguimiento
- Implementar un modelo de detección (YOLO) y seguimiento (DeepSORT)
- Localizar a todas las personas en la escena
- Asignar ID persistente a cada individuo

### 2. Estimación de Pose (Esqueletos)
- Extraer puntos clave del esqueleto (keypoints) de cada individuo
- Utilizar modelos como MediaPipe u OpenPose
- Procesar cada fotograma para obtener coordenadas de pose

### 3. Análisis de Secuencia Temporal
- Procesar secuencias temporales de datos de pose
- Implementar red neuronal recurrente (LSTM) o Transformer
- Reconocer patrones de movimiento para acciones específicas

### 4. Clasificación de Interacción
- Generar etiquetas que clasifiquen la naturaleza de la interacción
- Categorías: "neutral", "agresión", "forcejeo", "robo", etc.

### 5. Asignación de Roles (Capa Lógica)
- Desarrollar módulo de reglas heurísticas
- Analizar salida del modelo temporal para determinar roles
- Identificar: "iniciador/asaltante", "receptor/víctima", etc.

## 🛠️ Pipeline del Proyecto
``Detección → Seguimiento → Estimación de Pose → Análisis Temporal → Clasificación → Asignación de Roles``
---

**Nota**: Este proyecto está en desarrollo activo.

---
### Comparativa de Enfoques para Detección de Acciones

| Característica | Enfoque 1 (YOLO + Keras) | Enfoque 2 (Solo Keras 3D-CNN) |
| :--- | :--- | :--- |
| **Propósito** | Detección de objetos + Análisis de secuencia | Análisis de video End-to-End |
| **Velocidad** | **Muy Rápido** (Ideal para tiempo real) | Lento |
| **Precisión** | Buena a Excelente | Potencialmente la mejor (si tienes datos) |
| **Datos Req.** | Moderados a Altos | **Masivos** |
| **Complejidad** | Alta (múltiples pasos) | Extrema (un solo modelo gigante) |
