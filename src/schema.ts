import * as z from "zod";
import { CommonAchievements, IdolAchievements, Idols, OptionalAchievements, RecomRoutes, StTypes, TotalAchievements } from "./types";

export const MilestoneSchema = z.object(
    {
        threshold: z.number(),
        exp: z.number()
    }
)

export const IdolInfoSchema = z.object(
    {
        family_name: z.string(),
        name: z.string(),
        color: z.string(),
        primary: z.enum(StTypes),
        secondary: z.enum(StTypes),
    }
)

export const IdolExpectationSchema = z.object(
    {
        achievement: z.enum(IdolAchievements),
        value: z.number()
    }
)

export const TotalExpectationSchema = z.object(
    {
        achievement: z.enum(TotalAchievements),
        value: z.number()
    }
)
export const IdolRecommendationSchema = z.object(
    {
        idol: z.enum(Idols),
        cumsum: z.number(),
        expectations: z.array(IdolExpectationSchema),
    }
)

export const TotalRecommendationsSchema = z.object(
    {
        primaStella: z.enum(Idols),
        cumsum: z.number(),
        expectations: z.array(TotalExpectationSchema),
    }
)

export const AppConfigSchema = z.object(
    {
        achievements: z.record(
            z.enum(IdolAchievements),
            z.object(
                {
                    name: z.string(),
                    milestones: z.array(MilestoneSchema)
                }
            )
        ),
        totalAchievements: z.record(
            z.enum(TotalAchievements),
            z.object(
                {
                    name: z.string(),
                    featureName: z.string(),
                    milestones: z.array(MilestoneSchema),
                    routeRecom: z.array(z.enum(RecomRoutes)),
                    lessonRecom: z.array(z.enum([])), // TODO: どうするか決める
                }
            )
        ),
        idols: z.record(
            z.enum(Idols),
            IdolInfoSchema
        ),
        // achievementMapping: z.object(
        //     {
        //         totals: z.record(
        //             z.enum(TotalAchievements),
        //             z.string(),
        //         ),
        //         idols: z.record(
        //             z.enum(Idols),
        //             z.record(
        //                 z.enum(CommonAchievements),
        //                 z.string()
        //             ).and(
        //                 z.partialRecord(
        //                     z.enum(OptionalAchievements),
        //                     z.string()
        //                 )
        //             ),
        //         )
        //     }
        // )
        achievementMapping: z.record(
            z.enum(Idols),
            z.record(
                z.enum(CommonAchievements),
                z.string()
            ).and(
                z.partialRecord(
                    z.enum(OptionalAchievements),
                    z.string()
                )
            ),
        )
    }
);

export const IdolValueSchema = z.record(
    z.enum(Idols),
    z.intersection(
        z.looseRecord(
            z.enum(CommonAchievements),
            z.number().default(0),
        ),
        z.looseRecord(
            z.enum(OptionalAchievements),
            z.number().optional().default(0),
        )
    )
)

export const TotalValueSchema = z.record(
    z.enum(TotalAchievements),
    z.number().default(0),
)

export const CurrentValueSchema = z.object(
    {
        idols: IdolValueSchema,
        totals: TotalValueSchema,
    }
)

export type TMilestone = z.infer<typeof MilestoneSchema>

export type TIdolExpectation = z.infer<typeof IdolExpectationSchema>
export type TIdolRecommendation = z.infer<typeof IdolRecommendationSchema>

export type TTotalRecommendation = z.infer<typeof TotalRecommendationsSchema>